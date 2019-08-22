import { EventTest } from 'public/EventTest';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { ApiService } from 'shared/ApiService';
import * as $ from 'jquery';
@autoinject
export class Navbar {
  loggedIn = null;
  logoutLink: HTMLElement;
  registerLink:HTMLElement;
  loginLink:HTMLElement;
  retriveUser: any;
  loggout:any;
  retriveVal:any;
  constructor(private router: Router, private eventAggregator: EventAggregator, private api: ApiService) {
    this.eventAggregator = eventAggregator;
  }
  async activate() {
   
  }
  async attached() {
    let response = await this.api.getCurrentUser();
    var retrievedVal = await sessionStorage.getItem("currentUserId");
    
    if (retrievedVal === 'undefined') {
      this.logoutLink.style.display = "none";
      this.loginLink.style.display="block";
      this.registerLink.style.display="block";
    }
    else {
      this.loginLink.style.display="none";
      this.registerLink.style.display="none";
    }
   
  }
  navigateToHome() {
    this.router.navigate('/home')
  }
  toListYourCar() {
    this.router.navigate('/user/listyourcar')
  }
  toLoginPage() {
    this.router.navigate('/login').then(() => {
      this.eventAggregator.publish(new EventTest)
    });
  }
  toRegisterPage() {
    this.router.navigate('/register')
  }
  //TODO refresh the page
  async logout() {
    await this.api.logout();
    this.attached();
    this.router.navigateToRoute("home");
  }
  navigateToWorks(){
    this.router.navigate('/works');
  }
}
