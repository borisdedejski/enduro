import { CarEvent } from './CarEvent';
import { ApiService } from './../../shared/ApiService';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class ListYourCar {
  fullName: string;
  carLocationCountry = [
    { id: 0, name: 'Macedonia' },
    { id: 1, name: 'Serbia' }
  ];
  selectedCountry = null;
  addressForPickup: string;
  driverLicenseNo: string;
  mobileNumber: string;

  currentUser: any;
  currentUserId: any;
  
  constructor(private router: Router, private eventAggregator: EventAggregator, private api: ApiService) {
    this.eventAggregator = eventAggregator;
  }

  async attached() {
    // this.fullName = "Boris"; //TODO FullName is from current user and the field is readonly
    this.currentUser = await this.api.getCurrentUser();
    this.fullName = this.currentUser.fullName;
  }

  // try() {
  //   this.router.navigate('listyourcar-3').then(() => {
  //     this.eventAggregator.publish("test")
  //   });
  // }

  navigateToStep2() {
    this.router.navigate('listyourcar-2').then(() => {
      this.eventAggregator.publish(new CarEvent(this.fullName, this.selectedCountry, this.addressForPickup, this.driverLicenseNo, this.mobileNumber))
    });
  }

}
