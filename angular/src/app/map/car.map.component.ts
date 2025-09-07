import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { CarService } from '../proxy/cars/car.service';
import { CarDto } from '../proxy/cars/models';
import { LocalizationPipe, PagedResultDto } from '@abp/ng.core';

@Component({
  selector: 'app-car-map',
  standalone: true,
  imports: [CommonModule, LocalizationPipe],
  templateUrl: './car.map.component.html',
  styleUrl: './car.map.component.scss'
})
export class CarMapComponent implements AfterViewInit, OnDestroy {
  private carService = inject(CarService);

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map!: L.Map;
  private markersLayer = L.layerGroup();
  private bounds = L.latLngBounds([]);
  markersCount = 0;

  
  private defaultCenter: L.LatLngTuple = [31.9539, 35.9106];
  private defaultZoom = 11;

  ngAfterViewInit(): void {


    
    (L.Icon.Default.prototype as any)._getIconUrl = function (name: string) {
      return (L as any).Icon.Default.imagePath + name;
    };
    (L as any).Icon.Default.imagePath = 'assets/images/icon/';
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/icon/marker-icon-2x.png',
      iconUrl: 'assets/images/icon/marker-icon.png',
      shadowUrl: 'assets/images/icon/marker-shadow.png',
    });

    this.map = L.map(this.mapContainer.nativeElement, {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a target="_blank" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);

    this.load();
    setTimeout(() => this.map.invalidateSize(), 0); 
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  load(): void {
   
    this.carService.getList({ skipCount: 0, maxResultCount: 1000, sorting: '' } as any)
      .subscribe((res: CarDto[] | PagedResultDto<CarDto>) => {
        const items = Array.isArray(res) ? res : res.items ?? [];
        this.renderMarkers(items);
      });
  }

  private renderMarkers(cars: CarDto[]) {
    this.markersLayer.clearLayers();
    this.bounds = L.latLngBounds([]);
    this.markersCount = 0;
    const defaultIcon = L.icon({
      iconUrl: '/assets/images/icon/marker-icon.png',
      iconRetinaUrl: '/assets/images/icon/marker-icon-2x.png',
      shadowUrl: '/assets/images/icon/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    for (const c of cars) {
      
      if (c.latitude === 0 && c.longitude === 0) continue;

      const latLng: L.LatLngTuple = [c.latitude as number, c.longitude as number];

      const marker = L.marker(latLng, { icon: defaultIcon }).bindPopup(this.buildPopup(c));
      marker.addTo(this.markersLayer);
      this.bounds.extend(latLng);
      this.markersCount++;
    }

    
    if (this.markersCount > 0) {
      this.map.fitBounds(this.bounds.pad(0.2));
    } else {
      this.map.setView(this.defaultCenter, this.defaultZoom);
    }
  }

  private buildPopup(c: CarDto): string {
    const lat = (c.latitude ?? 0).toFixed(6);
    const lng = (c.longitude ?? 0).toFixed(6);
    const name = c.name ?? '—';
    return `<div><strong>${this.escape(name)}</strong><br/>${lat}, ${lng}</div>`;
  }



  private escape(s: string): string {
    const div = document.createElement('div');
    div.innerText = s;
    return div.innerHTML;
  }
}
