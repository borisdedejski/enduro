var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from "aurelia-framework";
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.saveData = function (str) {
        this.sharingData = str;
    };
    UserService.prototype.getData = function () {
        return this.sharingData;
    };
    UserService = __decorate([
        autoinject
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=UserService.js.map