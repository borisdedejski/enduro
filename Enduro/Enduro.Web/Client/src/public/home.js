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
import 'corejs-typeahead';
import * as $ from 'jquery';
import { ApiService } from "shared/ApiService";
import * as moment from 'moment';
import { SharedService } from 'shared/SharedService';
import { SendSearchDates } from 'shared/SendSearchDates';
import { SendSortDetails } from 'shared/SendSortDetails';
var Home = /** @class */ (function () {
    function Home(service, router, api, sendDatesService, sendSortDetails) {
        this.service = service;
        this.router = router;
        this.api = api;
        this.sendDatesService = sendDatesService;
        this.sendSortDetails = sendSortDetails;
        this.service = service;
        this.page = 1;
    }
    Home.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('/uniquecities')];
                    case 1:
                        response = _a.sent();
                        this.cars = response.items;
                        this.cities = response.uniqueLocationCities;
                        this.searchFunction();
                        localStorage.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.searchCar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.checkEndDate()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.post("/searchCar?searchParam=" + this.searchParam + "&page=" + this.page, {
                                rentFrom: this.rentFrom,
                                rentTo: this.rentTo
                            })];
                    case 1:
                        response = _a.sent();
                        this.sendToCarList(response);
                        this.sendSortDetails.saveData(this.searchParam);
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Rent To Date needs to be bigger than Rent From");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.sendToCarList = function (resp) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.saveData(resp)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sendDatesService.saveData(this.rentFrom, this.rentTo)];
                    case 2:
                        _a.sent();
                        this.router.navigate('/app');
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.checkEndDate = function () {
        if (moment(new Date(this.rentFrom)) <= moment(new Date(this.rentTo)))
            return true;
        else
            return false;
    };
    Home.prototype.handleDateChangeStart = function (e) {
        this.rentFrom = e.detail.startDate;
    };
    Home.prototype.handleDateChangeEnd = function (e) {
        this.rentTo = e.detail.startDate;
    };
    Home.prototype.substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;
            // an array that will be populated with substring matches
            matches = [];
            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            cb(matches);
        };
    };
    ;
    Home.prototype.searchFunction = function () {
        this.typeaheadCall = $(this.typeahead);
        this.typeaheadCall.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'cities',
            source: this.substringMatcher(this.cities),
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'Unable to find result',
                    '</div>'
                ]
            }
        });
    };
    Home = __decorate([
        autoinject,
        __metadata("design:paramtypes", [SharedService, Router, ApiService,
            SendSearchDates, SendSortDetails])
    ], Home);
    return Home;
}());
export { Home };
//# sourceMappingURL=home.js.map