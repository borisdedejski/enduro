import { SendSearchDates } from 'shared/SendSearchDates';
import { autoinject, bindable } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { ApiService } from "shared/ApiService";
import { SharedService } from "shared/SharedService";
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshEvent } from 'shared/RefreshEvent';
import { SendSortDetails } from 'shared/SendSortDetails';

@autoinject
export class SortByPrompt {

  options = [
    { id: 0, name: 'low to high' },
    { id: 1, name: 'high to low' }
  ]
  selectedOption = null;

  data: any;
  searchParam: any;
  searchDates: any;
  rentFrom: any;
  rentTo: any;
  currentPage: any;

  constructor(private controller: DialogController, private api: ApiService, private sharedService: SharedService, private getDataService: SendSearchDates
    , private router: Router, private eventAggregator: EventAggregator) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
  }
  async getFromStorage(){
    var data = localStorage.getItem("testObject");
    this.data = JSON.parse(data);
    this.searchParam = this.data.items[0].locationCity; //ako e do ovde nemoze avtomobilite da se od razlicni gradovi

    var retrieveDates = localStorage.getItem("saveDates");
    this.searchDates = JSON.parse(retrieveDates);
    this.rentFrom = this.searchDates[0];
    this.rentTo = this.searchDates[1];
  }
  async sortByPrompt() {
    // this.data = this.sharedService.getData();
    // this.searchParam = this.data.items[0].locationCity; //ako e do ovde nemoze avtomobilite da se od razlicni gradovi
    // this.searchDates = this.getDataService.getData();
    // this.rentFrom = this.searchDates[0];
    // this.rentTo = this.searchDates[1];
    
    await this.getFromStorage();
    if (this.selectedOption === "low to high") {
      let response = await this.api.get(`/querycars?searchParam=${this.searchParam}&rentFrom=${this.rentFrom}&rentTo=${this.rentTo}&priceOrder=ascending`)
      localStorage.clear();

      this.sharedService.saveData(response);
      await this.eventAggregator.publish(new RefreshEvent)
      this.controller.ok();
    }
    else if (this.selectedOption === "high to low") {
      let response = await this.api.get(`/querycars?searchParam=${this.searchParam}&rentFrom=${this.rentFrom}&rentTo=${this.rentTo}&priceOrder=descending`)
      localStorage.clear(); //this is MUST because in the car-list we either get info from the storage or from the service 
      //here we need to get info from the service
      this.sharedService.saveData(response);
      await this.eventAggregator.publish(new RefreshEvent)
      this.controller.ok();
    }
  }

}
