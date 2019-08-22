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
import { SendSearchDates } from 'shared/SendSearchDates';
import { autoinject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { ApiService } from "shared/ApiService";
import { SharedService } from "shared/SharedService";
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshEvent } from 'shared/RefreshEvent';
var SortByPrompt = /** @class */ (function () {
    function SortByPrompt(controller, api, sharedService, getDataService, router, eventAggregator) {
        this.controller = controller;
        this.api = api;
        this.sharedService = sharedService;
        this.getDataService = getDataService;
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.options = [
            { id: 0, name: 'low to high' },
            { id: 1, name: 'high to low' }
        ];
        this.selectedOption = null;
        this.controller = controller;
        controller.settings.centerHorizontalOnly = true;
    }
    SortByPrompt.prototype.getFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, retrieveDates;
            return __generator(this, function (_a) {
                data = localStorage.getItem("testObject");
                this.data = JSON.parse(data);
                this.searchParam = this.data.items[0].locationCity; //ako e do ovde nemoze avtomobilite da se od razlicni gradovi
                retrieveDates = localStorage.getItem("saveDates");
                this.searchDates = JSON.parse(retrieveDates);
                this.rentFrom = this.searchDates[0];
                this.rentTo = this.searchDates[1];
                return [2 /*return*/];
            });
        });
    };
    SortByPrompt.prototype.sortByPrompt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // this.data = this.sharedService.getData();
                    // this.searchParam = this.data.items[0].locationCity; //ako e do ovde nemoze avtomobilite da se od razlicni gradovi
                    // this.searchDates = this.getDataService.getData();
                    // this.rentFrom = this.searchDates[0];
                    // this.rentTo = this.searchDates[1];
                    return [4 /*yield*/, this.getFromStorage()];
                    case 1:
                        // this.data = this.sharedService.getData();
                        // this.searchParam = this.data.items[0].locationCity; //ako e do ovde nemoze avtomobilite da se od razlicni gradovi
                        // this.searchDates = this.getDataService.getData();
                        // this.rentFrom = this.searchDates[0];
                        // this.rentTo = this.searchDates[1];
                        _a.sent();
                        if (!(this.selectedOption === "low to high")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.api.get("/querycars?searchParam=" + this.searchParam + "&rentFrom=" + this.rentFrom + "&rentTo=" + this.rentTo + "&priceOrder=ascending")];
                    case 2:
                        response = _a.sent();
                        localStorage.clear();
                        this.sharedService.saveData(response);
                        return [4 /*yield*/, this.eventAggregator.publish(new RefreshEvent)];
                    case 3:
                        _a.sent();
                        this.controller.ok();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(this.selectedOption === "high to low")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.api.get("/querycars?searchParam=" + this.searchParam + "&rentFrom=" + this.rentFrom + "&rentTo=" + this.rentTo + "&priceOrder=descending")];
                    case 5:
                        response = _a.sent();
                        localStorage.clear(); //this is MUST because in the car-list we either get info from the storage or from the service 
                        //here we need to get info from the service
                        this.sharedService.saveData(response);
                        return [4 /*yield*/, this.eventAggregator.publish(new RefreshEvent)];
                    case 6:
                        _a.sent();
                        this.controller.ok();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SortByPrompt = __decorate([
        autoinject,
        __metadata("design:paramtypes", [DialogController, ApiService, SharedService, SendSearchDates,
            Router, EventAggregator])
    ], SortByPrompt);
    return SortByPrompt;
}());
export { SortByPrompt };
//# sourceMappingURL=sort-by-prompt.js.map