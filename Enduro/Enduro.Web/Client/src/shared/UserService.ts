import { autoinject } from "aurelia-framework";


@autoinject
export class UserService{
  sharingData:any;

  saveData(str){
    this.sharingData = str;
  }
  getData(){
    return this.sharingData;
  }
}
