var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM } from 'aurelia-pal';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
var App = /** @class */ (function () {
    function App(router, httpClient, api) {
        this.router = router;
        this.httpClient = httpClient;
        this.api = api;
        httpClient.configure(function (config) {
            config.useStandardConfiguration();
        });
    }
    App.prototype.configureRouter = function (config, router) {
        config.titlee = 'Endruo';
        var handleUnknownRoutes = function (instruction) {
            return {
                route: '',
                moduleId: PLATFORM.moduleName('public/home')
            };
        };
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
        ]);
        this.router = router;
    };
    App = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, HttpClient, Object])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map