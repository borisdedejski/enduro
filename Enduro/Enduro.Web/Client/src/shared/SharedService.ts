import { autoinject } from "aurelia-framework";


@autoinject
export class SharedService{
  sharingData:any;
  
  saveData(str){
    this.sharingData = str;
  }
  getData(){
    return this.sharingData;
  }
}
