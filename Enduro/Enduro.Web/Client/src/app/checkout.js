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
import { SharedService } from './../shared/SharedService';
import { ApiService } from 'shared/ApiService';
import { CheckoutEvent } from './CheckoutEvent';
import { DialogService } from 'aurelia-dialog';
import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { PayPrompt } from 'resources/elements/prompts/pay-prompt/pay-prompt';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as moment from 'moment';
import { User } from 'user/account';
var Checkout = /** @class */ (function () {
    function Checkout(router, dialog, eventAggregator, api, sharedService) {
        var _this = this;
        this.router = router;
        this.dialog = dialog;
        this.eventAggregator = eventAggregator;
        this.api = api;
        this.sharedService = sharedService;
        this.userLocationCountry = [
            { id: 0, name: 'Macedonia' },
            { id: 1, name: 'Serbia' }
        ];
        this.selectedCountry = null;
        this.driverLicenseCountry = [
            { id: 0, name: 'Macedonia' },
            { id: 1, name: 'Serbia' }
        ];
        this.selectedDriverLicenseCountry = null;
        this.selectedValidMonth = null;
        this.validYears = [
            { id: 0, name: '18' },
            { id: 1, name: '19' },
            { id: 2, name: '20' },
            { id: 3, name: '21' },
            { id: 4, name: '22' },
            { id: 5, name: '23' },
            { id: 6, name: '24' },
            { id: 7, name: '25' },
        ];
        this.selectedValidYear = null;
        this.selectedBirthDay = null;
        this.selectedBirthMonth = null;
        this.selectedBirthYear = null;
        this.birthYear = [];
        this.birthDays = [];
        this.birthMonth = [];
        this.validMonths = [];
        this.idCounter = 0;
        this.subscription = this.eventAggregator.subscribe(CheckoutEvent, function (msg) {
            _this.ownerId = msg.ownerId,
                _this.carMake = msg.carMake,
                _this.carModel = msg.carModel,
                _this.carYear = msg.carYear,
                _this.rentFrom = msg.rentFrom,
                _this.rentTo = msg.rentTo,
                _this.locationPickup = msg.locationPickup,
                _this.tripPerDay = msg.tripPerDay;
            _this.carProfilePicture = msg.carProfilePicture;
        });
    }
    Checkout.prototype.activate = function (params) {
        this.carId = params;
    };
    Checkout.prototype.deactivate = function () {
        this.subscription.dispose();
    };
    Checkout.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, i, i, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.api.get("/users/" + this.ownerId)];
                    case 1:
                        response = _c.sent();
                        this.ownerFullName = response.fullName;
                        _a = this;
                        return [4 /*yield*/, this.userProfilePicture(response.id)];
                    case 2:
                        _a.userPicture = _c.sent();
                        this.calculateTripPrice();
                        _b = this;
                        return [4 /*yield*/, this.api.getCurrentUser()];
                    case 3:
                        _b.currentUser = _c.sent();
                        this.currentUserId = this.currentUser.id;
                        this.currentUserFullName = this.currentUser.fullName;
                        //Choose year field
                        for (i = 1950; i < 2001; i++) {
                            this.birthYear.push({ id: this.idCounter, name: i });
                            this.idCounter++;
                        }
                        //Choose birth day field
                        for (i = 0; i < 31; i++) {
                            this.birthDays.push({ id: i, name: i + 1 });
                        }
                        //Choose birth month 
                        for (i = 0; i < 12; i++) {
                            this.birthMonth.push({ id: i, name: i + 1 });
                            this.validMonths.push({ id: i, name: i + 1 });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Checkout.prototype.calculateTripPrice = function () {
        var from = moment(new Date(this.rentTo));
        var to = moment(new Date(this.rentFrom));
        var difference = from.diff(to, 'days');
        this.totalPrice = Number(this.tripPerDay) * Number(difference + 1);
    };
    Checkout.prototype.confirmPay = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.payedCar = new PayedCar;
                        {
                            this.payedCar.carId = this.carId;
                            // this.payedCar.userPaysId = "96ece075-330f-440a-b029-a05a472e782f"; //this is current user TODO
                            this.payedCar.userPaysId = this.currentUserId; //this is current user TODO
                            this.payedCar.userRentsId = this.ownerId;
                            this.payedCar.rentedFrom = this.rentFrom;
                            this.payedCar.rentTo = this.rentTo;
                            this.payedCar.tripTotalPrice = this.totalPrice;
                            this.payedCar.userPaysMobile = this.mobileNumber;
                            this.payedCar.userPaysCountry = this.selectedCountry;
                            this.payedCar.userPaysLicenseCountry = this.selectedDriverLicenseCountry;
                            this.payedCar.userPaysState = this.state;
                            this.payedCar.userPaysLicenseNumber = this.licenseNumber;
                            this.payedCar.validUntilMonth = this.selectedValidMonth;
                            this.payedCar.validUntilYear = this.selectedValidYear;
                            this.payedCar.userPaysFullName = this.fullName;
                            this.payedCar.userPaysDateOfBirth = new Date(new Date().setFullYear(this.selectedBirthYear, this.selectedBirthMonth - 1, this.selectedBirthDay));
                        }
                        return [4 /*yield*/, this.sharedService.saveData(this.payedCar)];
                    case 1:
                        _a.sent();
                        this.dialog.open({ viewModel: PayPrompt, model: 'Confirm prompt', lock: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    Checkout.prototype.userProfilePicture = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        _b = User.bind;
                        return [4 /*yield*/, this.api.get("/users/" + userId)];
                    case 1:
                        _a.user = new (_b.apply(User, [void 0, _c.sent()]))();
                        return [2 /*return*/, "/storage/" + this.user.avatarUri.container + "/" + this.user.avatarUri.file + "?" + Date.now()];
                }
            });
        });
    };
    Checkout = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, DialogService,
            EventAggregator,
            ApiService, SharedService])
    ], Checkout);
    return Checkout;
}());
export { Checkout };
var PayedCar = /** @class */ (function () {
    function PayedCar() {
    }
    return PayedCar;
}());
export { PayedCar };
//# sourceMappingURL=checkout.js.map