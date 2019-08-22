import { autoinject } from "aurelia-framework";


@autoinject
export class StoreData{
  sharingData:any;
  
  saveData(str){
    this.sharingData = str;
  }
  getData(){
    return this.sharingData;
  }
}
