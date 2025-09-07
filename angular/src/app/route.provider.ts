import { RoutesService, eLayoutType } from '@abp/ng.core';
import { provideAppInitializer, inject } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routes = inject(RoutesService);
  routes.add([
    {
      path: '/',
      name: '::Menu:Home',
      iconClass: 'fas fa-home',
      order: 1,
      layout: eLayoutType.application,
    },
    {
      path: '/cars',
      name: '::Menu:Cars',
      iconClass: 'fas fa-car',
      layout: eLayoutType.application,
      requiredPolicy: 'AbpSolution1.Cars',
    },
    {
      path: '/map',
      name: '::Menu:Map',
      iconClass: 'fas fa-map',
      layout: eLayoutType.application,
      requiredPolicy: 'AbpSolution1.Cars',
    },
  ]);
}
