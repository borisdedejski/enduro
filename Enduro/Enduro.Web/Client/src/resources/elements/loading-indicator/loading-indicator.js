var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as nprogress from 'nprogress';
import { bindable, noView } from 'aurelia-framework';
import 'nprogress/nprogress.css';
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator() {
        this.loading = false;
    }
    LoadingIndicator.prototype.loadingChanged = function (newValue) {
        if (newValue) {
            nprogress.start();
        }
        else {
            nprogress.done();
        }
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], LoadingIndicator.prototype, "loading", void 0);
    LoadingIndicator = __decorate([
        noView
    ], LoadingIndicator);
    return LoadingIndicator;
}());
export { LoadingIndicator };
//# sourceMappingURL=loading-indicator.js.map