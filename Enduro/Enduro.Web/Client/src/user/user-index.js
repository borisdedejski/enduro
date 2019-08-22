var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from 'aurelia-fetch-client';
import { PLATFORM } from 'aurelia-pal';
import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
var UserIndex = /** @class */ (function () {
    function UserIndex(router, httpClient) {
        this.router = router;
        this.httpClient = httpClient;
        httpClient.configure(function (config) {
            config.useStandardConfiguration();
        });
    }
    UserIndex.prototype.configureRouter = function (config, router) {
        config.titlee = 'Endruo';
        var handleUnknownRoutes = function (instruction) {
            return {
                route: '',
                moduleId: PLATFORM.moduleName('./dashboard')
            };
        };
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
        ]);
        this.router = router;
    };
    UserIndex = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, HttpClient])
    ], UserIndex);
    return UserIndex;
}());
export { UserIndex };
//# sourceMappingURL=user-index.js.map