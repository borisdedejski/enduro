var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import 'bootstrap-daterangepicker';
import * as $ from "jquery";
import * as moment from 'moment';
var Datepicker = /** @class */ (function () {
    function Datepicker() {
    }
    Datepicker.prototype.attached = function () {
        var _this = this;
        if (typeof (this.start) == "undefined") {
            this.start = moment();
        }
        $(this.element).daterangepicker({
            startDate: this.start,
            singleDatePicker: true,
            minDate: this.start,
        }, function (s) { return _this.changeValueSingle(s); });
        this.changeValueSingle(this.start);
    };
    Datepicker.prototype.changeValueSingle = function (start) {
        $(this.elementspan).html(start.format('MMMM D, YYYY'));
        var evt = new CustomEvent("changing", {
            detail: {
                startDate: start.format('MMMM D YYYY'),
            },
            bubbles: true
        });
        this.element.dispatchEvent(evt);
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], Datepicker.prototype, "start", void 0);
    Datepicker = __decorate([
        autoinject
    ], Datepicker);
    return Datepicker;
}());
export { Datepicker };
//# sourceMappingURL=datepicker.js.map