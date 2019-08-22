import { UserSearch } from './../shared/UserSearch';
import { autoinject, bindable, observable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { SortByPrompt } from "resources/elements/prompts/sort-by-prompt/sort-by-prompt";
import { MoreFiltersPrompt } from "resources/elements/prompts/more-filters-prompt/more-filters-prompt";
import { EventAggregator } from 'aurelia-event-aggregator';
import { SharedService } from 'shared/SharedService';
import { AnyARecord } from 'dns';
import { ApiService } from 'shared/ApiService';
import { SendSearchDates } from 'shared/SendSearchDates';
import { RefreshEvent } from 'shared/RefreshEvent';
import { NavigationEvent } from 'shared/NavigationEvent';
import { SendSortDetails } from 'shared/SendSortDetails';
import { StoreData } from 'shared/StoreData';

@autoinject
export class CarList {
  subscription: any;
  searchResults: any;
  carImage: any;
  carImages: any;
  page: number;
  totalPages: any;

  searchDates: any;
  rentFrom: any;
  rentTo: any;
  navigationResponse: any;
  currentPage: any;
  nextPage: any;
  previousPage: any;
  searchParam: any;

  //Store the previous parameters on refresh 
  storeSearchResults: any;
  storeTotalPages: any;
  storeSearchDates: any;
  storeRentFrom: any;
  storeRentTo: any;

  constructor(private service: SharedService, private router: Router, private dialog: DialogService, private eventAggregator: EventAggregator,
    private api: ApiService, private sendDatesService: SendSearchDates, private sendSortDetails: SendSortDetails, private storeData: StoreData
  ) {
    this.carImages = [];
    this.eventAggregator = eventAggregator;
    this.service = service;
    this.page = 1;
  }

  activate() {
    // localStorage.clear(); // filters wont work without clearing that
    this.checkStorage();
  }

  async checkStorage() {
    if (localStorage.length > 0) {
      var retrievedObject = await localStorage.getItem("testObject");
      this.searchResults = JSON.parse(retrievedObject);

      var retrievedDates = localStorage.getItem("saveDates");
      this.searchDates = JSON.parse(retrievedDates);
      
      this.rentFrom = this.searchDates[0];
      this.rentTo = this.searchDates[1];
      this.totalPages = this.searchResults.totalPages;
    }
    else {
      this.searchResults = this.service.getData();
      this.searchDates = this.sendDatesService.getData();
      this.rentFrom = this.searchDates[0];
      this.rentTo = this.searchDates[1];
      this.totalPages = this.searchResults.totalPages;

      localStorage.setItem("testObject", JSON.stringify(this.searchResults));
      localStorage.setItem("saveDates", JSON.stringify(this.searchDates));
    }
  }

  deactivate() {
    this.subscription.dispose();
  }

  async attached() {
    this.checkStorage();
    for (var i = 0; i < this.searchResults.length; i++) {
      let image = this.searchResults[i].carImage;
      this.carImages.push(image);
    }
    this.subscription = this.eventAggregator.subscribe(RefreshEvent, () => {
      this.activate();
    });
  }

  navigateToCar(carId) {
    this.router.navigate(`cars/${carId}`);
  }

  sortBy() {
    this.dialog.open({ viewModel: SortByPrompt, model: 'Sortby prompt', lock: true });
  }

  moreFilters() {
    this.dialog.open({ viewModel: MoreFiltersPrompt, model: 'Sortby prompt', lock: true });
  }

  async carProfilePicture(imageId) {
    let response = await this.api.get(`/images/${imageId}`);
    return response;
  }

  async navigateToPage(page) {
    page = page + 1;
    let response = await this.api.post(`/searchCar?searchParam=${this.searchResults.items[0].locationCity}&page=${page}`,
      {
        rentFrom: this.rentFrom,
        rentTo: this.rentTo
      })
    this.page = page;
    await this.service.saveData(response);
    await this.sendDatesService.saveData(this.rentFrom,this.rentTo);

    localStorage.clear();
    this.eventAggregator.publish(new RefreshEvent);
  }

  async navigateToNext() {
    this.currentPage = this.page;
    if (this.currentPage < this.totalPages) {
      this.nextPage = this.currentPage + 1;
      let response = await this.api.post(`/searchCar?searchParam=${this.searchResults.items[0].locationCity}&page=${this.nextPage}`,
        {
          rentFrom: this.rentFrom,
          rentTo: this.rentTo
        })
      this.page = this.nextPage;
      await this.service.saveData(response);
      await this.sendDatesService.saveData(this.rentFrom,this.rentTo); 
      //beacause localstorage was cleared but dates were empty so goes in the second else in check
      //storage bese prazen a odese vo elsot na check storage da ne se gubat podatocite na refresh


      await localStorage.clear();
      this.eventAggregator.publish(new RefreshEvent);
    }
  }


  async navigateToPreviuos() {
    this.currentPage = this.page;
    if (this.currentPage > 1) {
      this.previousPage = this.currentPage - 1;
      let response = await this.api.post(`/searchCar?searchParam=${this.searchResults.items[0].locationCity}&page=${this.previousPage}`,
        {
          rentFrom: this.rentFrom,
          rentTo: this.rentTo
        })
      this.page = this.previousPage;
      await this.service.saveData(response);
      await this.sendDatesService.saveData(this.rentFrom,this.rentTo);

      await localStorage.clear();
      this.eventAggregator.publish(new RefreshEvent);
    }
  }
}


