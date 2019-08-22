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
var DataTable = /** @class */ (function () {
    function DataTable() {
    }
    DataTable.prototype.createTable = function () {
    };
    DataTable.prototype.attached = function () {
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], DataTable.prototype, "userId", void 0);
    DataTable = __decorate([
        autoinject,
        __metadata("design:paramtypes", [])
    ], DataTable);
    return DataTable;
}());
export { DataTable };
//# sourceMappingURL=datatable.js.map