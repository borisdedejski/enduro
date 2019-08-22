import { autoinject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { SharedService } from "shared/SharedService";
import { SendSearchDates } from "shared/SendSearchDates";
import { ApiService } from "shared/ApiService";
import { EventAggregator } from "aurelia-event-aggregator";
import { RefreshEvent } from "shared/RefreshEvent";
import { SendSortDetails } from "shared/SendSortDetails";

@autoinject
export class MoreFiltersPrompt {

  doors = [
    { id: 0, name: '2' },
    { id: 1, name: '3' },
    { id: 2, name: '4' },
    { id: 3, name: '5+' },
  ];
  selectedDoors = null;

  vechileBrands = [
    { id: 0, name: 'Bmw' },
    { id: 1, name: 'Mercedes' },
    { id: 2, name: 'Audi' },
    { id: 3, name: 'Volkswagen' },
    { id: 4, name: 'Skoda' },
    { id: 5, name: 'Peugeot' },
    { id: 6, name: 'Volvo' },
    { id: 7, name: 'Seat' },
    { id: 8, name: 'Porsche' },
  ];
  selectedCarMake = null;
  data: any;

  searchParam: any;
  searchDates: any;
  rentFrom: any;
  rentTo: any;

  constructor(private controller: DialogController, private sharedService: SharedService, private getDataService: SendSearchDates, private api: ApiService, private eventAggregator: EventAggregator, private sendSortDetails: SendSortDetails) {
    this.controller = controller;
    controller.settings.centerHorizontalOnly = true;
  }

  async getFromStorage() {
    var data = localStorage.getItem("testObject");
    this.data = JSON.parse(data);

    // this.searchParam = this.sendSortDetails.getData();
    this.searchParam = this.data.items[0].locationCity;
    var dates = localStorage.getItem("saveDates");
    this.searchDates = JSON.parse(dates);
    this.rentFrom = this.searchDates[0];
    this.rentTo = this.searchDates[1];

  }
  async moreFiltersPrompt() {
    if (this.selectedDoors == null) {
      this.selectedDoors = 0;
    }
    await this.getFromStorage();

    if (this.selectedCarMake != null) {
      let response = await this.api.get(`/querycars?searchParam=&rentFrom=${this.rentFrom}&rentTo=${this.rentTo}&priceOrder=ascending&carMake=${this.selectedCarMake}&numberOfDoors=${this.selectedDoors}`)
      localStorage.clear();
      this.sharedService.saveData(response);
      this.eventAggregator.publish(new RefreshEvent)
      this.controller.ok();
    }
    else if (this.selectedCarMake == null) {
      let response = await this.api.get(`/querycars?searchParam=&rentFrom=${this.rentFrom}&rentTo=${this.rentTo}&priceOrder=ascending&numberOfDoors=${this.selectedDoors}`)
        localStorage.clear();
        this.sharedService.saveData(response);
        this.eventAggregator.publish(new RefreshEvent)
        this.controller.ok();

    }

  }

}
