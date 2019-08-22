import { PLATFORM } from 'aurelia-pal';
import { autoinject,bindable } from 'aurelia-framework';
import { RouteConfig, Router, NavigationInstruction } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class AppIndex {
  api;

  constructor(private router: Router, private httpClient: HttpClient,api) {
    this.api=api;
    httpClient.configure(config => {
      config.useStandardConfiguration();
    })
  }
  
  configureRouter(config, router) {
    config.titlee = 'Endruo';

    const handleUnknownRoutes = (instruction: NavigationInstruction): RouteConfig => {
      return {
        route: '',
        moduleId: PLATFORM.moduleName('app/car-list')
      };
    }
    config.mapUnknownRoutes(handleUnknownRoutes);

    config.map([
      {
        route: '', name: 'carlist', title: 'Car list',
        moduleId: PLATFORM.moduleName('app/car-list')
      },
      {
        route: 'cars/:id', name: 'car', title: 'Car',
        moduleId: PLATFORM.moduleName('app/car-details')
      },
      {
        route: 'checkout/:id', name: 'checkout', title: 'Checkout',
        moduleId: PLATFORM.moduleName('app/checkout')
      },
    ])

    this.router = router;
  }
}
