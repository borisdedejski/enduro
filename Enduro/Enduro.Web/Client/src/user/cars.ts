import { User } from 'user/account';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ApiService } from "shared/ApiService";
import * as  moment from 'moment';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshEvent } from 'shared/RefreshEvent';


@autoinject
export class Cars {
  carRequests: any;
  user: User;
  userImage: any;
  subscription: any;
  listedCars: any;
  rentedCars: any;

  currentUser: any;
  currentUserId: any;  //user that is logged in

  constructor(private router: Router, private api: ApiService,
    private eventAggregator: EventAggregator) {
    this.listedCars = [];
    this.rentedCars = [];
  }

  async activate() {
    // this.currentUserId = "bc267bfd-09ce-4dfa-95b2-c01be7b56a02";
    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;
  }

  deactivate() {
    this.subscription.dispose();
  }

  async attached() {
    this.loadRequests();

    this.subscription = this.eventAggregator.subscribe(RefreshEvent, () => {
      this.loadRequests();
    });
  }

  async loadRequests() {
    let response = await this.api.get(`/paycar/${this.currentUserId}`);
    this.carRequests = response.items;
    console.log(this.carRequests)
    for (var i = 0; i < this.carRequests.length; i++) {
      this.carRequests[i].rentedFrom = moment(new Date(this.carRequests[i].rentedFrom)).format("MMM Do YY");
      this.carRequests[i].rentedTo = moment(new Date(this.carRequests[i].rentedTo)).format("MMM Do YY");
    }
    this.loadListedCars();
    this.loadRentedCars();
  }

  async loadListedCars() {
    let response = await this.api.get(`/users/${this.currentUserId}/listedcars`);
    this.listedCars = response.items;
  }

  async loadRentedCars() {
    let response = await this.api.get(`/users/${this.currentUserId}/rentedcars`);
    this.rentedCars = response.items;
  }

  async carAccept(requestId) {
    let accept = true;
    let response = await this.api.patch(`/paycar/${requestId}`,
      {
        isAccepted: accept
      }).then(async () => {
        this.eventAggregator.publish(new RefreshEvent);
      });
  }

  async carDecline(requestId) {
    let response = await this.api.delete(`/paycar/${requestId}`).then(() => {
      this.eventAggregator.publish(new RefreshEvent);
    })
  }
  navigateToCar(payedCarId){
    this.router.navigate(`/app/cars/${payedCarId}`);
  }

}
