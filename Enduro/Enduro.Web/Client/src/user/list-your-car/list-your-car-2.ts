import { CarDetailsEvent } from './CarDetailsEvent';
import { CarEvent } from 'user/list-your-car/CarEvent';
import { ApiService } from 'shared/ApiService';
import { Router } from "aurelia-router";
import { autoinject, observable } from "aurelia-framework";
import * as moment from 'moment';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class ListYourCarStep2 {
  carMake: string;
  carModel: string;
  carYear: string;
  carGas: string;
  rentFrom: any;
  rentTo: any;
  transmissions = [
    { id: 0, name: 'Manual' },
    { id: 1, name: 'Automatic' }
  ];
  selectedTransmission = null;
  doors = [
    { id: 0, name: '2' },
    { id: 1, name: '3' },
    { id: 2, name: '4' },
    { id: 3, name: '5+' },
  ];
  selectedDoors = null;
  carHorsePower;
  carLiters;
  carDescription;
  //car features
  usb = false;
  gps = false;
  tiptronic = false;
  audioinput = false;
  ecodrive = false;
  sportmode = false;
  horsePowerList = [
    { id: 0, name: 'hp' },
    { id: 1, name: 'kW' }
  ]
  selectedHorsePower = null;
  carGuideline;
  carInsurance;
  carLocationCity: string;
  carPrice;

  carLocationPickup: string;
  subscription: any;
  //values that need to be get from list-your-car1 subscription
  fullName: any;
  selectedCountry: any;
  addressForPickup: string;
  driverLicenseNo: string;
  mobileNumber: string;
  //For is it save to go to the next step
  isSubmited: boolean;
  //car class
  carClassList = [
    { id: 0, name: 'business' },
    { id: 1, name: 'casual' }
  ]
  selectedCarClass = null;


  constructor(private controller: ValidationController, private router: Router, private api: ApiService, private eventAggregator: EventAggregator) {
    this.isSubmited = false;
    this.subscription = this.eventAggregator.subscribe(CarEvent, (msg) => {
      this.fullName = msg.fullName;
      this.selectedCountry = msg.locationCountry;
      this.addressForPickup = msg.addressForPickUp;
      this.driverLicenseNo = msg.driverLicenseNo;
      this.mobileNumber = msg.mobileNumber;
    })
  }

  deactivate() {
    this.subscription.dispose();
  }

  validation() {
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
      .on(this)
  }

  ValidateMe() {
    this.validation();
    this.controller.validate().then(v => {
      if (v.valid) {
        this.listyourcar();
      }
      else {
        console.log("this is not valid")
      }
    })
  }

  listyourcar() {
    this.isSubmited = true;
    this.router.navigate('listyourcar-3').then(() => {
      this.eventAggregator.publish(new CarEvent(this.fullName, this.selectedCountry, this.addressForPickup, this.driverLicenseNo, this.mobileNumber))
      this.eventAggregator.publish(
        new CarDetailsEvent(
          this.carMake,
          this.carModel,
          this.carYear,
          this.carGas,
          this.rentFrom,
          this.rentTo,
          this.selectedTransmission,
          this.selectedDoors,
          this.carHorsePower,
          this.carLiters,
          this.carDescription,
          this.usb,
          this.gps,
          this.tiptronic,
          this.audioinput,
          this.ecodrive,
          this.sportmode,
          this.selectedHorsePower,
          this.carGuideline,
          this.carInsurance,
          this.carLocationCity,
          this.carPrice,
          this.selectedCarClass
        ))
    });;
  }

  canDeactivate() {
    if (this.isSubmited === false)
      return confirm('You have unsaved changes are you sure you wish to leave')

    return true;
  }

  navigateToStep1() {
    this.router.navigate('listyourcar');
  }

  navigateToStep3() {
    this.router.navigate('listyourcar-3')
  }

  checkEndDate() {
    if (moment(new Date(this.rentFrom)) <= moment(new Date(this.rentTo)))
      return true;
    else
      return false;
  }

  handleDateChangeStart(e: CustomEvent) {
    this.rentFrom = e.detail.startDate;
  }

  handleDateChangeEnd(e: CustomEvent) {
    this.rentTo = e.detail.startDate;
  }

}
