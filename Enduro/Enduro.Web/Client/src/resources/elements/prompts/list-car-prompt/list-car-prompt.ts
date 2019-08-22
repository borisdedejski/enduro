import { UserService } from './../../../../shared/UserService';
import { SharedService } from './../../../../shared/SharedService';
import { DialogController } from "aurelia-dialog";
import { autoinject } from "aurelia-framework";
import { ApiService } from "shared/ApiService";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from 'aurelia-router';
import * as  moment from 'moment';

@autoinject
export class ListCarPrompt {
  data: any;
  userData:any;

  //
  currentUser:any;
  currentUserId:any;
  constructor(private controller: DialogController, private api: ApiService, private sharedService: SharedService, 
    private router: Router, private userService: UserService) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
  }

  async confirmPay() {
    this.data = this.sharedService.getData();
    this.userData = this.userService.getData();

    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;
    let response = await this.api.post('/cars',
      {
        // userId: "96ece075-330f-440a-b029-a05a472e782f",
        userId: this.currentUserId,
        make: this.data.carMake,
        model: this.data.carModel,
        year: this.data.carYear,
        gas: this.data.carGas,
        numberOfDoors: this.data.selectedDoors,
        horsePower: this.data.carHorsePower,
        litersPerKm: this.data.carLiters,
        description: this.data.carDescription,
        guideLines: this.data.carGuideline,
        price: this.data.carPrice,
        locationCity: this.data.carLocationCity,
        locationCountry: this.data.locationCountry,
        locationPickUp: this.data.addressForPickUp,
        features: this.data.features,
        insurance: "string",
        carImages: this.data.CarImages,
        rentedFrom: moment(new Date(this.data.rentFrom)).format(),
        rentedTo: moment(new Date(this.data.rentTo)).format(),
        carClass: this.data.carClass,
        transmission: this.data.selectedTransmission
      }
    )
    // let editUser = ... TODO
    await this.controller.ok();
    await this.router.navigate(`app/cars/${response.carId}`);

  }
}
