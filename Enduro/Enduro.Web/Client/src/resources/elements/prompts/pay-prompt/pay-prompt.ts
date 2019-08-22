import { ApiService } from 'shared/ApiService';
import { SharedService } from './../../../../shared/SharedService';
import { DialogController } from "aurelia-dialog";
import { autoinject } from "aurelia-framework";
import { Router } from 'aurelia-router';

@autoinject
export class PayPrompt {
  data: any;
  carId: string;

  //auth
  currentUser:any;
  currentUserId:any;
  constructor(private controller: DialogController, private sharedService: SharedService,
    private api: ApiService, private router: Router) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;

  }

  async confirmPay() {
    this.data = this.sharedService.getData();
    this.carId = this.data.carId.id;

    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;

    let response = await this.api.post(`/paycar/${this.carId}`,
      {
        // userPaysId: this.data.userPaysId,
        userPaysId: this.currentUserId,
        userRentsId: this.data.userRentsId,
        rentedFrom: this.data.rentedFrom,
        rentedTo: this.data.rentTo,
        tripTotalPrice: this.data.tripTotalPrice,
        userPaysMobile: this.data.userPaysMobile,
        userPaysCountry: this.data.userPaysCountry,
        userPaysLicenseCountry: this.data.userPaysLicenseCountry,
        userPaysState: this.data.userPaysState,
        userPaysLicenseNumber: this.data.userPaysLicenseNumber,
        validUntilMonth: this.data.validUntilMonth,
        validUntilYear: this.data.validUntilYear,
        userPaysFullName: this.data.userPaysFullName,
        userPaysDateOfBirth: this.data.userPaysDateOfBirth
      })
      .then(() => {
        this.controller.ok();
        this.router.navigate('user/cars');
      });
  }
}
