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
import { ApiService } from "shared/ApiService";
import { User } from "user/account";
import { EventAggregator } from "aurelia-event-aggregator";
import { RefreshEvent } from "shared/RefreshEvent";
import { CheckoutEvent } from "./CheckoutEvent";
var CarDetails = /** @class */ (function () {
    function CarDetails(router, api, eventAggregator) {
        this.router = router;
        this.api = api;
        this.eventAggregator = eventAggregator;
        //to bind the needs
        this.usb = false;
        this.audioinput = false;
        this.gps = false;
        this.tiptronic = false;
        this.ecodrive = false;
        this.sportmode = false;
        this.listOfImages = [];
        this.eventAggregator = eventAggregator;
    }
    CarDetails.prototype.activate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.storeParams = params;
                        this.carId = params.id;
                        return [4 /*yield*/, this.loadCar()];
                    case 1:
                        _a.sent();
                        this.comments = this.listComments;
                        return [2 /*return*/];
                }
            });
        });
    };
    CarDetails.prototype.loadCar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get("/cars/" + this.carId)];
                    case 1:
                        response = _a.sent();
                        this.make = response.make;
                        this.model = response.model;
                        this.year = response.year;
                        this.numberOfTrips = response.numberOfTrips;
                        this.gas = response.gas;
                        this.numberOfDoors = response.numberOfDoors;
                        this.horsePower = response.horsePower;
                        this.litersPerKm = response.litersPerKm;
                        this.description = response.description;
                        this.guideLines = response.guideLines;
                        this.reviews = response.reviews;
                        this.price = response.price;
                        this.locationPickUp = response.locationPickUp;
                        this.features = response.features;
                        this.carImages = response.carImages;
                        this.rentFrom = response.rentedFrom;
                        this.maxdate = response.rentedTo;
                        this.ownerFullName = response.ownerFullName;
                        this.listComments = response.listComments;
                        this.transmission = response.transmission;
                        this.userId = response.userId;
                        this.totalTrips = response.totalTrips;
                        this.containsFeature("usb") === true ? this.usb = true : this.usb = false;
                        this.containsFeature("ecodrive") === true ? this.ecodrive = true : this.ecodrive = false;
                        this.containsFeature("gps") === true ? this.gps = true : this.gps = false;
                        this.containsFeature("tiptronic") === true ? this.tiptronic = true : this.tiptronic = false;
                        this.containsFeature("audioinput") === true ? this.audioinput = true : this.audioinput = false;
                        this.containsFeature("sportmode") === true ? this.sportmode = true : this.sportmode = false;
                        for (i = 0; i < this.carImages.length; i++) {
                            this.listOfImages.push("https://localhost:44319/api/images/" + this.carImages[i]);
                        }
                        this.carProfilePicture = this.listOfImages[0];
                        this.listOfImagesLength = this.listOfImages.length;
                        this.start = this.rentFrom;
                        this.end = this.rentTo;
                        this.maxdate = this.rentTo;
                        return [2 /*return*/];
                }
            });
        });
    };
    CarDetails.prototype.deactivate = function () {
        // this.subscription.dispose();
    };
    CarDetails.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.getCurrentUser()];
                    case 1:
                        _a.currentUser = _c.sent();
                        this.currentUserId = this.currentUser.id;
                        this.UserId = this.currentUserId;
                        _b = this;
                        return [4 /*yield*/, this.userProfilePicture(this.UserId)];
                    case 2:
                        _b.UserImage = _c.sent();
                        this.subscription = this.eventAggregator.subscribe(RefreshEvent, function () {
                            _this.activate(_this.storeParams);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CarDetails.prototype.containsFeature = function (feature) {
        var index = this.features.indexOf(feature);
        if (index > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    CarDetails.prototype.navigateToCheckout = function () {
        var _this = this;
        this.router.navigate("/app/checkout/" + this.carId).then(function () {
            _this.eventAggregator.publish(new CheckoutEvent(_this.userId, _this.make, _this.model, _this.year, _this.rentFrom, _this.rentTo, _this.locationPickUp, _this.price, _this.carProfilePicture));
        });
    };
    CarDetails.prototype.handleDateChangeStart = function (e) {
        this.rentFrom = e.detail.startDate;
    };
    CarDetails.prototype.handleDateChangeEnd = function (e) {
        this.rentTo = e.detail.startDate;
    };
    CarDetails.prototype.userProfilePicture = function (userId) {
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
    CarDetails = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Router, ApiService, EventAggregator])
    ], CarDetails);
    return CarDetails;
}());
export { CarDetails };
//# sourceMappingURL=car-details.js.map