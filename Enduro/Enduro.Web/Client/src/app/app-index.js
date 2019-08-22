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
var AppIndex = /** @class */ (function () {
    function AppIndex(router, httpClient, api) {
        this.router = router;
        this.httpClient = httpClient;
        this.api = api;
        httpClient.configure(function (config) {
            config.useStandardConfiguration();
        });
    }
    AppIndex.prototype.configureRouter = function (config, router) {
        config.titlee = 'Endruo';
        var handleUnknownRoutes = function (instruction) {
            return {
                route: '',
                moduleId: PLATFORM.moduleName('app/car-list')
            };
        };
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
        ]);
        this.router = router;
    };
    AppIndex = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, HttpClient, Object])
    ], AppIndex);
    return AppIndex;
}());
export { AppIndex };
//# sourceMappingURL=app-index.js.map