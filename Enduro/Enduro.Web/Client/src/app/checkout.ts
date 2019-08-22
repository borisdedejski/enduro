import { SharedService } from './../shared/SharedService';
import { ApiService } from 'shared/ApiService';
import { CheckoutEvent } from './CheckoutEvent';
import { DialogService } from 'aurelia-dialog';
import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { PayPrompt } from 'resources/elements/prompts/pay-prompt/pay-prompt';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as  moment from 'moment';
import { User } from 'user/account';

@autoinject
export class Checkout {
  subscription: any;
  //Get variables
  ownerFullName: any;
  carMake: any;
  carModel: any;
  carYear: any;
  rentFrom: any;
  rentTo: any;
  locationPickup: any;
  tripPerDay: any;
  totalPrice: number;
  carProfilePicture: any;
  userPicture: any;
  ownerId: any;
  userRenter: any;
  user: User;
  //PayYourCar
  mobileNumber: any;
  state: any;
  licenseNumber: any;
  fullName: any;
  userPayId: any; //Id of the user who pays the car
  payedCar: any;
  userLocationCountry = [
    { id: 0, name: 'Macedonia' },
    { id: 1, name: 'Serbia' }
  ];
  selectedCountry = null;

  driverLicenseCountry = [
    { id: 0, name: 'Macedonia' },
    { id: 1, name: 'Serbia' }
  ];
  selectedDriverLicenseCountry = null;

  validMonths: any;
  selectedValidMonth = null;

  validYears = [
    { id: 0, name: '18' },
    { id: 1, name: '19' },
    { id: 2, name: '20' },
    { id: 3, name: '21' },
    { id: 4, name: '22' },
    { id: 5, name: '23' },
    { id: 6, name: '24' },
    { id: 7, name: '25' },

  ];
  selectedValidYear = null;

  birthDays: any;
  selectedBirthDay = null;
  birthMonth: any;
  selectedBirthMonth = null;
  birthYear: any;
  selectedBirthYear = null;
  idCounter: number;

  carId: any;

  //authentication
  currentUser:any;
  currentUserId:any;
  currentUserFullName:any;
  constructor(private router: Router, private dialog: DialogService,
    private eventAggregator: EventAggregator,
    private api: ApiService, private sharedService: SharedService) {

    this.birthYear = [];
    this.birthDays = [];
    this.birthMonth = [];
    this.validMonths = [];
    this.idCounter = 0;

    this.subscription = this.eventAggregator.subscribe(CheckoutEvent, (msg) => {
        this.ownerId = msg.ownerId,
        this.carMake = msg.carMake,
        this.carModel = msg.carModel,
        this.carYear = msg.carYear,
        this.rentFrom = msg.rentFrom,
        this.rentTo = msg.rentTo,
        this.locationPickup = msg.locationPickup,
        this.tripPerDay = msg.tripPerDay
      this.carProfilePicture = msg.carProfilePicture
    });
  }

  activate(params) {
    this.carId = params;
  }

  deactivate() {
    this.subscription.dispose();
  }

  async attached() {
    let response = await this.api.get(`/users/${this.ownerId}`);
    this.ownerFullName = response.fullName;
    this.userPicture = await this.userProfilePicture(response.id);
    this.calculateTripPrice();

    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;
    this.currentUserFullName = this.currentUser.fullName;
    //Choose year field
    for (var i = 1950; i < 2001; i++) {
      this.birthYear.push({ id: this.idCounter, name: i })
      this.idCounter++;
    }
    //Choose birth day field
    for (var i = 0; i < 31; i++) {
      this.birthDays.push({ id: i, name: i + 1 });
    }
    //Choose birth month 
    for (var i = 0; i < 12; i++) {
      this.birthMonth.push({ id: i, name: i + 1 });
      this.validMonths.push({ id: i, name: i + 1 });
    }
  }

  calculateTripPrice() {
    let from = moment(new Date(this.rentTo));
    let to = moment(new Date(this.rentFrom));
    let difference = from.diff(to, 'days');
    this.totalPrice = Number(this.tripPerDay) * Number(difference + 1);
  }

  async confirmPay() {

    this.payedCar = new PayedCar
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
    await this.sharedService.saveData(this.payedCar)
    this.dialog.open({ viewModel: PayPrompt, model: 'Confirm prompt', lock: true });
  }

  async userProfilePicture(userId) {
    this.user = new User(await this.api.get(`/users/${userId}`));
    return `/storage/${this.user.avatarUri.container}/${this.user.avatarUri.file}?` + Date.now();
  }
}

export class PayedCar {
  carId: any;
  userPaysId: any;
  userRentsId: any;
  rentedFrom: any;
  rentedTo: any;
  tripTotalPrice: any;
  userPaysMobile: any;
  userPaysCountry: any;
  userPaysLicenseCountry: any;
  userPaysState: any;
  userPaysLicenseNumber: any;
  validUntilMonth: any;
  validUntilYear: any;
  userPaysFullName: any;
  userPaysDateOfBirth: any;
}
