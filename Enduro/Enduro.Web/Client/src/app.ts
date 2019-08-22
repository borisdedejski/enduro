import { PLATFORM } from 'aurelia-pal';
import { autoinject, bindable } from 'aurelia-framework';
import { RouteConfig, Router, NavigationInstruction } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class App {
  api;
  constructor(private router: Router, private httpClient: HttpClient, api) {
    this.api = api;
    httpClient.configure(config => {
      config.useStandardConfiguration();
    })
  }

  configureRouter(config, router) {
    config.titlee = 'Endruo';

    const handleUnknownRoutes = (instruction: NavigationInstruction): RouteConfig => {
      return {
        route: '',
        moduleId: PLATFORM.moduleName('public/home')
      };
    }
    config.mapUnknownRoutes(handleUnknownRoutes);

    config.map([
      {
        route: '', name: 'home', title: 'Home',
        moduleId: PLATFORM.moduleName('public/home')
      },
      // {
      //   route: 'login',
      //   name: 'login',
      //   moduleId: PLATFORM.moduleName('public/login')
      // },
      // {
      //   route: 'register',
      //   name: 'register',
      //   moduleId: PLATFORM.moduleName('public/register')
      // },
      {
        route: 'register', name: 'register',
        moduleId: PLATFORM.moduleName('public/register'),
      },
      {
        route: 'login', name: 'login',
        moduleId: PLATFORM.moduleName('public/login'),
      },
      {
        route: ['app'],
        name: 'app',
        moduleId: PLATFORM.moduleName('app/app-index')
      },
      {
        route: 'user',
        name: 'user',
        moduleId: PLATFORM.moduleName('user/user-index')
      },
      {
        route: 'works',
        name: 'works',
        moduleId: PLATFORM.moduleName('public/works')
      },
    ])

    this.router = router;
  }
}
