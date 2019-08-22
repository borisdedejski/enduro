import { TestEvent } from './../shared/TestEvent';
import { UserSearch } from './../shared/UserSearch';
import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, bindable, inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationController, ValidationRules } from 'aurelia-validation';
import 'corejs-typeahead';
import * as $ from 'jquery';
import { ApiService } from "shared/ApiService";
import * as moment from 'moment';
import { SharedService } from 'shared/SharedService';
import { SendSearchDates } from 'shared/SendSearchDates';
import { SendSortDetails } from 'shared/SendSortDetails';

@autoinject
export class Home {
  typeaheadCall;
  typeahead: any;
  cars: any;
  cities: any;
  searchParam: any;
  page: any;
  rentFrom: any;
  rentTo: any;

  resultForCarList: any;
  constructor(private service: SharedService, private router: Router, private api: ApiService,
    private sendDatesService:SendSearchDates, private sendSortDetails:SendSortDetails) {
    this.service = service;
    this.page = 1;
  }
  
  async attached() {
    let response = await this.api.get('/uniquecities');
    this.cars = response.items;
    this.cities = response.uniqueLocationCities;
    this.searchFunction();
    localStorage.clear();
  }

  async searchCar() {
    if (this.checkEndDate()) {
      let response = await this.api.post(`/searchCar?searchParam=${this.searchParam}&page=${this.page}`,
        {
          rentFrom: this.rentFrom,
          rentTo: this.rentTo
        });
      this.sendToCarList(response)
      this.sendSortDetails.saveData(this.searchParam);
      // this.eventAggregator.publish(new UserSearch(response));
      // this.router.navigate('/app');
    }
    else {
      alert("Rent To Date needs to be bigger than Rent From")
    }
  }

  async sendToCarList(resp) {
    await this.service.saveData(resp);
    await this.sendDatesService.saveData(this.rentFrom,this.rentTo);
    this.router.navigate('/app');
  }

  checkEndDate() {
    if (moment(new Date(this.rentFrom)) <= moment(new Date(this.rentTo)))
      return true;
    else
      return false;
  }

  handleDateChangeStart(e: CustomEvent) {
    this.rentFrom = e.detail.startDate;
  }

  handleDateChangeEnd(e: CustomEvent) {
    this.rentTo = e.detail.startDate;
  }

  substringMatcher(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
      // an array that will be populated with substring matches
      matches = [];
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
      cb(matches);
    };
  };

  searchFunction() {
    this.typeaheadCall = $(this.typeahead);
    this.typeaheadCall.typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
      {
        name: 'cities',
        source: this.substringMatcher(this.cities),
        templates: {
          empty: [
            '<div class="empty-message">',
            'Unable to find result',
            '</div>'
          ]
        }
      })
  }

}
