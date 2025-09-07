import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {
  ListService,
  PagedResultDto,
  LocalizationPipe,
  PermissionDirective,
  AutofocusDirective,
} from '@abp/ng.core';

import {
  ConfirmationService,
  Confirmation,
  NgxDatatableDefaultDirective,
  NgxDatatableListDirective,
  ModalCloseDirective,
  ModalComponent,
} from '@abp/ng.theme.shared';
import { CarService } from '../proxy/cars/car.service';
import { CarDto } from '../proxy/cars/models';



@Component({
  selector: 'app-car',
  templateUrl: './car.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgbDropdownModule,
    ModalComponent,
    AutofocusDirective,
    NgxDatatableListDirective,
    NgxDatatableDefaultDirective,
    PermissionDirective,
    ModalCloseDirective,
    LocalizationPipe,
  ],
  providers: [ListService],
})
export class CarComponent implements OnInit {
  public readonly list = inject(ListService);
  private carService = inject(CarService);
  private fb = inject(FormBuilder);
  private confirmation = inject(ConfirmationService);

  cars = { items: [], totalCount: 0 } as PagedResultDto<CarDto>;
  selectedCar = {} as CarDto;
  form: FormGroup;
  isModalOpen = false;

  ngOnInit() {
  const carQuery = (query: any) => this.carService.getList(query);

  this.list.hookToQuery(carQuery).subscribe((res: any) => {
    const items = Array.isArray(res) ? res : res.items;
    const totalCount = Array.isArray(res) ? res.length : res.totalCount ?? items.length;

    this.cars = { items, totalCount };
  });
}

  createCar() {
    this.selectedCar = {} as CarDto;
    this.buildForm();
    this.isModalOpen = true;
  }


  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.carService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedCar.name ?? '', Validators.required],
      latitude: [
        this.selectedCar.latitude ?? null,
        [Validators.required],
      ],
      longitude: [
        this.selectedCar.longitude ?? null,
        [Validators.required],
      ],
    });
  }

  save() {
  if (this.form.invalid) return;

  const payload = this.form.value as CarDto; 
  this.carService.create(payload).subscribe(() => {
    this.isModalOpen = false;
    this.form.reset();
    this.list.get(); 
  });
}
}
