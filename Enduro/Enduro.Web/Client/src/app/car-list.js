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
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { SortByPrompt } from "resources/elements/prompts/sort-by-prompt/sort-by-prompt";
import { MoreFiltersPrompt } from "resources/elements/prompts/more-filters-prompt/more-filters-prompt";
import { EventAggregator } from 'aurelia-event-aggregator';
import { SharedService } from 'shared/SharedService';
import { ApiService } from 'shared/ApiService';
import { SendSearchDates } from 'shared/SendSearchDates';
import { RefreshEvent } from 'shared/RefreshEvent';
import { SendSortDetails } from 'shared/SendSortDetails';
import { StoreData } from 'shared/StoreData';
var CarList = /** @class */ (function () {
    function CarList(service, router, dialog, eventAggregator, api, sendDatesService, sendSortDetails, storeData) {
        this.service = service;
        this.router = router;
        this.dialog = dialog;
        this.eventAggregator = eventAggregator;
        this.api = api;
        this.sendDatesService = sendDatesService;
        this.sendSortDetails = sendSortDetails;
        this.storeData = storeData;
        this.carImages = [];
        this.eventAggregator = eventAggregator;
        this.service = service;
        this.page = 1;
    }
    CarList.prototype.activate = function () {
        // localStorage.clear(); // filters wont work without clearing that
        this.checkStorage();
    };
    CarList.prototype.checkStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retrievedObject, retrievedDates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(localStorage.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, localStorage.getItem("testObject")];
                    case 1:
                        retrievedObject = _a.sent();
                        this.searchResults = JSON.parse(retrievedObject);
                        retrievedDates = localStorage.getItem("saveDates");
                        this.searchDates = JSON.parse(retrievedDates);
                        this.rentFrom = this.searchDates[0];
                        this.rentTo = this.searchDates[1];
                        this.totalPages = this.searchResults.totalPages;
                        return [3 /*break*/, 3];
                    case 2:
                        this.searchResults = this.service.getData();
                        this.searchDates = this.sendDatesService.getData();
                        this.rentFrom = this.searchDates[0];
                        this.rentTo = this.searchDates[1];
                        this.totalPages = this.searchResults.totalPages;
                        localStorage.setItem("testObject", JSON.stringify(this.searchResults));
                        localStorage.setItem("saveDates", JSON.stringify(this.searchDates));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CarList.prototype.deactivate = function () {
        this.subscription.dispose();
    };
    CarList.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, image;
            var _this = this;
            return __generator(this, function (_a) {
                this.checkStorage();
                for (i = 0; i < this.searchResults.length; i++) {
                    image = this.searchResults[i].carImage;
                    this.carImages.push(image);
                }
                this.subscription = this.eventAggregator.subscribe(RefreshEvent, function () {
                    _this.activate();
                });
                return [2 /*return*/];
            });
        });
    };
    CarList.prototype.navigateToCar = function (carId) {
        this.router.navigate("cars/" + carId);
    };
    CarList.prototype.sortBy = function () {
        this.dialog.open({ viewModel: SortByPrompt, model: 'Sortby prompt', lock: true });
    };
    CarList.prototype.moreFilters = function () {
        this.dialog.open({ viewModel: MoreFiltersPrompt, model: 'Sortby prompt', lock: true });
    };
    CarList.prototype.carProfilePicture = function (imageId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/images/" + imageId)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CarList.prototype.navigateToPage = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = page + 1;
                        return [4 /*yield*/, this.api.post("/searchCar?searchParam=" + this.searchResults.items[0].locationCity + "&page=" + page, {
                                rentFrom: this.rentFrom,
                                rentTo: this.rentTo
                            })];
                    case 1:
                        response = _a.sent();
                        this.page = page;
                        return [4 /*yield*/, this.service.saveData(response)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendDatesService.saveData(this.rentFrom, this.rentTo)];
                    case 3:
                        _a.sent();
                        localStorage.clear();
                        this.eventAggregator.publish(new RefreshEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    CarList.prototype.navigateToNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentPage = this.page;
                        if (!(this.currentPage < this.totalPages)) return [3 /*break*/, 5];
                        this.nextPage = this.currentPage + 1;
                        return [4 /*yield*/, this.api.post("/searchCar?searchParam=" + this.searchResults.items[0].locationCity + "&page=" + this.nextPage, {
                                rentFrom: this.rentFrom,
                                rentTo: this.rentTo
                            })];
                    case 1:
                        response = _a.sent();
                        this.page = this.nextPage;
                        return [4 /*yield*/, this.service.saveData(response)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendDatesService.saveData(this.rentFrom, this.rentTo)];
                    case 3:
                        _a.sent();
                        //beacause localstorage was cleared but dates were empty so goes in the second else in check
                        //storage bese prazen a odese vo elsot na check storage da ne se gubat podatocite na refresh
                        return [4 /*yield*/, localStorage.clear()];
                    case 4:
                        //beacause localstorage was cleared but dates were empty so goes in the second else in check
                        //storage bese prazen a odese vo elsot na check storage da ne se gubat podatocite na refresh
                        _a.sent();
                        this.eventAggregator.publish(new RefreshEvent);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CarList.prototype.navigateToPreviuos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentPage = this.page;
                        if (!(this.currentPage > 1)) return [3 /*break*/, 5];
                        this.previousPage = this.currentPage - 1;
                        return [4 /*yield*/, this.api.post("/searchCar?searchParam=" + this.searchResults.items[0].locationCity + "&page=" + this.previousPage, {
                                rentFrom: this.rentFrom,
                                rentTo: this.rentTo
                            })];
                    case 1:
                        response = _a.sent();
                        this.page = this.previousPage;
                        return [4 /*yield*/, this.service.saveData(response)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendDatesService.saveData(this.rentFrom, this.rentTo)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, localStorage.clear()];
                    case 4:
                        _a.sent();
                        this.eventAggregator.publish(new RefreshEvent);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CarList = __decorate([
        autoinject,
        __metadata("design:paramtypes", [SharedService, Router, DialogService, EventAggregator,
            ApiService, SendSearchDates, SendSortDetails, StoreData])
    ], CarList);
    return CarList;
}());
export { CarList };
//# sourceMappingURL=car-list.js.map