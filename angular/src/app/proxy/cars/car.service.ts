import { PagedAndSortedResultRequestDto, PagedResultDto, RestService } from "@abp/ng.core";
import { inject, Injectable } from "@angular/core";
import { CarDto } from "./models";


@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiName = 'Default';
    private restService = inject(RestService);

  create = (input: CarDto) =>
    this.restService.request<any, CarDto>({
      method: 'POST',
      url: '/api/app/car',
      body: input,
    },
    { apiName: this.apiName });


  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/car/${id}`,
    },
    { apiName: this.apiName });


  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<CarDto>>({
      method: 'GET',
      url: '/api/app/car',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });


}
