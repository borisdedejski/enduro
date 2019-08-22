import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { ApiService } from "shared/ApiService";

@autoinject
export class Dashboard{

  data:any;
  currentUserId:any;
  currentUser:any;
  constructor(private router: Router, private api:ApiService){
  }

  async activate(){
    // this.currentUserId = "96ece075-330f-440a-b029-a05a472e782f";
    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;
  }

  async attached(){
    let response = await this.api.get(`/users/${this.currentUserId}/rentedcars`);
    this.data = response.items;
  }
}
