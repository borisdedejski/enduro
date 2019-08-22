import { autoinject } from "aurelia-framework";


@autoinject
export class SendSearchDates{
  sharingData:any;
  saveData(rentFrom,rentTo){

    this.sharingData = [rentFrom,rentTo];
  }

  getData(){
    return this.sharingData;
  }
}
