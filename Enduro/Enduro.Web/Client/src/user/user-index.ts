import { HttpClient } from 'aurelia-fetch-client';
import { PLATFORM } from 'aurelia-pal';
import { Router, NavigationInstruction, RouteConfig } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class UserIndex {

  constructor(private router: Router, private httpClient: HttpClient) {
    httpClient.configure(config => {
      config.useStandardConfiguration();
    })
  }
  configureRouter(config, router) {
    config.titlee = 'Endruo';

    const handleUnknownRoutes = (instruction: NavigationInstruction): RouteConfig => {
      return {
        route: '',
        moduleId: PLATFORM.moduleName('./dashboard')
      };
    }
    config.mapUnknownRoutes(handleUnknownRoutes);

    config.map([
      {
        route: 'dashboard', name: 'dashboard', icon: "fas fa-chart-line", title: "Dashboard",
        moduleId: PLATFORM.moduleName('./dashboard'),
        nav: true
      },
      {
        route: 'listyourcar', name: 'listyourcar', icon: "fas fa-car", title: "List your car",
        moduleId: PLATFORM.moduleName('./list-your-car/list-your-car'),
        nav: true

      },
      {
        route: 'listyourcar-2', name: 'listyourcar-2', title: 'List your car - Step 2',
        moduleId: PLATFORM.moduleName('./list-your-car/list-your-car-2'),

      },
      {
        route: 'listyourcar-3', name: 'listyourcar-3', title: 'List your car - Step 3',
        moduleId: PLATFORM.moduleName('./list-your-car/list-your-car-3'),
      },
      {
        route: 'cars', name: 'cars', icon: "fas fa-bell", title: 'Your cars',
        moduleId: PLATFORM.moduleName('./cars'),
        nav: true
      },
      {
        route: 'Account', name: 'acount', icon: "fas fa-cogs", title: 'Account',
        moduleId: PLATFORM.moduleName('./account'),
        nav: true
      }
    ])

    this.router = router;
  }
 
}
