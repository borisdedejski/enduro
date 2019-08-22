import { autoinject } from "aurelia-framework";


@autoinject
export class SendSortDetails{
  sharingData:any;
  
  saveData(str){
    this.sharingData = str;
  }
  getData(){
    return this.sharingData;
  }
}
