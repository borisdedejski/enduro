var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CarDetailsEvent } from './CarDetailsEvent';
import { CarEvent } from 'user/list-your-car/CarEvent';
import { ApiService } from 'shared/ApiService';
import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import * as moment from 'moment';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { EventAggregator } from 'aurelia-event-aggregator';
var ListYourCarStep2 = /** @class */ (function () {
    function ListYourCarStep2(controller, router, api, eventAggregator) {
        var _this = this;
        this.controller = controller;
        this.router = router;
        this.api = api;
        this.eventAggregator = eventAggregator;
        this.transmissions = [
            { id: 0, name: 'Manual' },
            { id: 1, name: 'Automatic' }
        ];
        this.selectedTransmission = null;
        this.doors = [
            { id: 0, name: '2' },
            { id: 1, name: '3' },
            { id: 2, name: '4' },
            { id: 3, name: '5+' },
        ];
        this.selectedDoors = null;
        //car features
        this.usb = false;
        this.gps = false;
        this.tiptronic = false;
        this.audioinput = false;
        this.ecodrive = false;
        this.sportmode = false;
        this.horsePowerList = [
            { id: 0, name: 'hp' },
            { id: 1, name: 'kW' }
        ];
        this.selectedHorsePower = null;
        //car class
        this.carClassList = [
            { id: 0, name: 'business' },
            { id: 1, name: 'casual' }
        ];
        this.selectedCarClass = null;
        this.isSubmited = false;
        this.subscription = this.eventAggregator.subscribe(CarEvent, function (msg) {
            _this.fullName = msg.fullName;
            _this.selectedCountry = msg.locationCountry;
            _this.addressForPickup = msg.addressForPickUp;
            _this.driverLicenseNo = msg.driverLicenseNo;
            _this.mobileNumber = msg.mobileNumber;
        });
    }
    ListYourCarStep2.prototype.deactivate = function () {
        this.subscription.dispose();
    };
    ListYourCarStep2.prototype.validation = function () {
        ValidationRules
            .ensure("carMake").required().withMessage("Car make is required")
            .ensure("carModel").required().withMessage("Car model is required")
            .ensure("carYear").required().withMessage("Car year is required")
            .ensure("carGas").required().withMessage("Car gas is required")
            .ensure("selectedTransmission").required().withMessage("Car transmission is required")
            .ensure("selectedDoors").required().withMessage("Car doors must be selected")
            .ensure("selectedHorsePower").required().withMessage("Choose horsepower or kw")
            .ensure("carLiters").required().withMessage("Liters per 100km must be selected")
            .ensure("carDescription").required().withMessage("Car description is required")
            .ensure("carPrice").required().withMessage("Car price is required")
            .ensure("carLocationCity").required().withMessage("Car location city is required")
            .ensure("selectedCountry").required().withMessage("Car location country is required")
            .on(this);
    };
    ListYourCarStep2.prototype.ValidateMe = function () {
        var _this = this;
        this.validation();
        this.controller.validate().then(function (v) {
            if (v.valid) {
                _this.listyourcar();
            }
            else {
                console.log("this is not valid");
            }
        });
    };
    ListYourCarStep2.prototype.listyourcar = function () {
        var _this = this;
        this.isSubmited = true;
        this.router.navigate('listyourcar-3').then(function () {
            _this.eventAggregator.publish(new CarEvent(_this.fullName, _this.selectedCountry, _this.addressForPickup, _this.driverLicenseNo, _this.mobileNumber));
            _this.eventAggregator.publish(new CarDetailsEvent(_this.carMake, _this.carModel, _this.carYear, _this.carGas, _this.rentFrom, _this.rentTo, _this.selectedTransmission, _this.selectedDoors, _this.carHorsePower, _this.carLiters, _this.carDescription, _this.usb, _this.gps, _this.tiptronic, _this.audioinput, _this.ecodrive, _this.sportmode, _this.selectedHorsePower, _this.carGuideline, _this.carInsurance, _this.carLocationCity, _this.carPrice, _this.selectedCarClass));
        });
        ;
    };
    ListYourCarStep2.prototype.canDeactivate = function () {
        if (this.isSubmited === false)
            return confirm('You have unsaved changes are you sure you wish to leave');
        return true;
    };
    ListYourCarStep2.prototype.navigateToStep1 = function () {
        this.router.navigate('listyourcar');
    };
    ListYourCarStep2.prototype.navigateToStep3 = function () {
        this.router.navigate('listyourcar-3');
    };
    ListYourCarStep2.prototype.checkEndDate = function () {
        if (moment(new Date(this.rentFrom)) <= moment(new Date(this.rentTo)))
            return true;
        else
            return false;
    };
    ListYourCarStep2.prototype.handleDateChangeStart = function (e) {
        this.rentFrom = e.detail.startDate;
    };
    ListYourCarStep2.prototype.handleDateChangeEnd = function (e) {
        this.rentTo = e.detail.startDate;
    };
    ListYourCarStep2 = __decorate([
        autoinject,
        __metadata("design:paramtypes", [ValidationController, Router, ApiService, EventAggregator])
    ], ListYourCarStep2);
    return ListYourCarStep2;
}());
export { ListYourCarStep2 };
//# sourceMappingURL=list-your-car-2.js.map