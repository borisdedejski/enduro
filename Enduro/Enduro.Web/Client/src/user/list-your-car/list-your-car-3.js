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
import { UserService } from './../../shared/UserService';
import { SharedService } from './../../shared/SharedService';
import { CarDetailsEvent } from './CarDetailsEvent';
import { CarEvent } from './CarEvent';
import { ApiService } from './../../shared/ApiService';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { ListCarPrompt } from "resources/elements/prompts/list-car-prompt/list-car-prompt";
import { EventAggregator } from 'aurelia-event-aggregator';
import * as moment from 'moment';
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var ListYourCarStep3 = /** @class */ (function () {
    function ListYourCarStep3(router, dialog, api, eventAggregator, sharedService, userService) {
        var _this = this;
        this.router = router;
        this.dialog = dialog;
        this.api = api;
        this.eventAggregator = eventAggregator;
        this.sharedService = sharedService;
        this.userService = userService;
        this.CarImages = [];
        this.listOfImages = [];
        this.carFeatureList = [];
        this.subscription = this.eventAggregator.subscribe(CarEvent, function (msg) {
            _this.fullName = msg.fullName,
                _this.locationCountry = msg.locationCountry,
                _this.addressForPickUp = msg.addressForPickUp,
                _this.driverLicenseNo = msg.driverLicenseNo,
                _this.mobileNumber = msg.mobileNumber;
        });
        this.subscription = this.eventAggregator.subscribe(CarDetailsEvent, function (msg) {
            _this.carMake = msg.carMake,
                _this.carModel = msg.carModel,
                _this.carYear = msg.carYear,
                _this.carGas = msg.carGas,
                _this.rentFrom = msg.rentFrom,
                _this.rentTo = msg.rentTo,
                _this.selectedTransmission = msg.selectedTransmission,
                _this.selectedDoors = msg.selectedDoors,
                _this.carHorsePower = msg.carHorsePower,
                _this.carLiters = msg.carLiters,
                _this.carDescription = msg.carDescription,
                _this.usb = msg.usb,
                _this.gps = msg.usb,
                _this.tiptronic = msg.tiptronic,
                _this.audioinput = msg.audioinput,
                _this.ecodrive = msg.ecodrive,
                _this.sportmode = msg.sportmode,
                _this.selectedHorsePower = msg.selectedHorsePower,
                _this.carGuideline = msg.carGuideline,
                _this.carInsurance = msg.carInsurance,
                _this.carLocationCity = msg.carLocationCity,
                _this.carPrice = msg.carPrice,
                _this.carClass = msg.carClass;
        });
    }
    ListYourCarStep3.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ListYourCarStep3.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getCurrentUser()];
                    case 1:
                        _a.currentUser = _b.sent();
                        this.currentUserId = this.currentUser.id;
                        return [2 /*return*/];
                }
            });
        });
    };
    ListYourCarStep3.prototype.deactivate = function () {
        this.subscription.dispose();
    };
    ListYourCarStep3.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        for (i = 0; i < this.selectedFiles.length; i++) {
                            formData.append("files[" + i + "]", this.selectedFiles[i]);
                        }
                        return [4 /*yield*/, this.api.upload("/images", formData)];
                    case 1:
                        response = _a.sent();
                        this.imageId = response.imageId;
                        this.listOfImages.push(["https://localhost:44319/api/images/" + this.imageId, "" + this.imageId]);
                        this.CarImages.push(this.imageId);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListYourCarStep3.prototype.deleteImage = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.CarImages.indexOf(image[1]);
                        if (!(index > -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.delete("/images/" + image[1])]; // to not store images that are uploaded before
                    case 1:
                        _a.sent(); // to not store images that are uploaded before
                        this.CarImages.splice(index, 1);
                        this.listOfImages.splice(index, 1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ListYourCarStep3.prototype.navigateToStep2 = function () {
        this.router.navigate('listyourcar-2');
    };
    ListYourCarStep3.prototype.confirmList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.user = new User;
                        {
                            this.user.fullName = this.fullName,
                                this.user.mobileNumber = this.mobileNumber,
                                this.user.driverLicenseNo = this.driverLicenseNo;
                        }
                        this.usb ? this.carFeatureList.push("usb") : false;
                        this.tiptronic ? this.carFeatureList.push("tiptronic") : false;
                        this.audioinput ? this.carFeatureList.push("audioinput") : false;
                        this.ecodrive ? this.carFeatureList.push("ecodrive") : false;
                        this.sportmode ? this.carFeatureList.push("sportmode") : false;
                        this.car = new Car;
                        {
                            // this.car.userId = "96ece075-330f-440a-b029-a05a472e782f",
                            this.car.userId = this.currentUserId,
                                this.car.carMake = this.carMake,
                                this.car.carModel = this.carModel,
                                this.car.carYear = Number(this.carYear),
                                this.car.carGas = this.carGas,
                                this.car.selectedDoors = Number(this.selectedDoors),
                                this.car.carHorsePower = Number(this.carHorsePower),
                                this.car.carLiters = Number(this.carLiters),
                                this.car.carDescription = this.carDescription,
                                this.car.carGuideline = this.carGuideline,
                                this.car.carPrice = Number(this.carPrice),
                                this.car.carLocationCity = this.carLocationCity,
                                this.car.locationCountry = this.locationCountry,
                                this.car.addressForPickUp = this.addressForPickUp,
                                this.car.features = this.carFeatureList,
                                this.car.carInsurance = this.carInsurance,
                                this.car.CarImages = this.CarImages,
                                this.car.rentFrom = moment(new Date(this.rentFrom)),
                                this.car.rentTo = moment(new Date(this.rentTo)),
                                this.car.carClass = this.carClass,
                                this.car.selectedTransmission = this.selectedTransmission;
                            // this.car.driverLicenseNo = this.driverLicenseNo,
                            // this.car.mobileNumber = this.mobileNumber,
                            // this.car.selectedHorsePower = this.selectedHorsePower,
                        }
                        //TODO for the edit
                        return [4 /*yield*/, this.sharedService.saveData(this.car)];
                    case 1:
                        //TODO for the edit
                        _a.sent();
                        return [4 /*yield*/, this.userService.saveData(this.user)];
                    case 2:
                        _a.sent();
                        this.dialog.open({ viewModel: ListCarPrompt, model: 'Confirm prompt', lock: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    ListYourCarStep3 = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, DialogService, ApiService,
            EventAggregator,
            SharedService,
            UserService])
    ], ListYourCarStep3);
    return ListYourCarStep3;
}());
export { ListYourCarStep3 };
//# sourceMappingURL=list-your-car-3.js.map