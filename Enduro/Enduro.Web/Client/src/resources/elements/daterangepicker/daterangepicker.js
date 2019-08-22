var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import 'bootstrap-daterangepicker';
import * as $ from "jquery";
import * as moment from 'moment';
import { ApiService } from 'shared/ApiService';
var Daterangepicker = /** @class */ (function () {
    function Daterangepicker(api) {
        this.api = api;
        this.userid = "";
    }
    Daterangepicker.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lifetime;
            var _this = this;
            return __generator(this, function (_a) {
                this.startDate = moment();
                this.endDate = moment();
                this.start = this.startDate.format("MMMM D, YYYY");
                this.end = this.endDate.format("MMMM D, YYYY");
                $(this.element).daterangepicker({
                    startDate: this.startDate,
                    endDate: this.endDate,
                    maxDate: this.maxdate
                    //  ranges: {
                    //  }
                }, function (s, e) { return _this.changeValueDouble(s, e); });
                return [2 /*return*/];
            });
        });
    };
    Daterangepicker.prototype.changeValueDouble = function (start, end) {
        $(this.elementspan).html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        this.start = start.format("MM/DD/YYYY");
        this.end = end.format("MM/DD/YYYY");
        var evt = new CustomEvent("change", {
            detail: {
                startDate: start.format('MM/DD/YYYY'),
                endDate: end.format('MM/DD/YYYY'),
            },
            bubbles: true
        });
        this.element.dispatchEvent(evt);
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], Daterangepicker.prototype, "start", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], Daterangepicker.prototype, "end", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], Daterangepicker.prototype, "maxdate", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Daterangepicker.prototype, "userid", void 0);
    Daterangepicker = __decorate([
        autoinject,
        __metadata("design:paramtypes", [ApiService])
    ], Daterangepicker);
    return Daterangepicker;
}());
export { Daterangepicker };
//# sourceMappingURL=daterangepicker.js.map