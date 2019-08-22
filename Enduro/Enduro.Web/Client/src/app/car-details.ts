import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ApiService } from "shared/ApiService";
import { User } from "user/account";
import $ from 'jquery';
import { EventAggregator } from "aurelia-event-aggregator";
import { RefreshEvent } from "shared/RefreshEvent";
import { CheckoutEvent } from "./CheckoutEvent";

@autoinject
export class CarDetails {
  carId: any;
  car: any;

  make: any;
  model: any;
  year: any;
  numberOfTrips: any;
  gas: any;
  numberOfDoors: any;
  horsePower: any;
  litersPerKm: any;
  description: any;
  guideLines: any;
  reviews: any;
  price: any;
  locationPickUp: any;
  features: any;
  carImages: any;
  rentedFrom: any;
  rentedTo: any;
  ownerFullName: any;
  listComments: any;
  transmission: any;
  //to bind the needs
  usb = false;
  audioinput = false;
  gps = false;
  tiptronic = false;
  ecodrive = false;
  sportmode = false;
  userId: any;
  totalTrips:any;


  user: any;
  UserImage: any;
  UserId: any;
  listOfImages: any;
  imageIndex: number;
  listOfImagesLength: number;
  carousel: HTMLElement;
  slider: any;
  comments: any;
  subscription: any;

  storeParams: any;
  rentFrom:any;
  rentTo:any;
  carProfilePicture:any;
  start:any;
  end:any;
  maxdate:any;

  //auth
  currentUser:any;
  currentUserId:any;

  constructor(private router: Router, private api: ApiService, private eventAggregator: EventAggregator) {
    this.listOfImages = [];
    this.eventAggregator = eventAggregator;
  }

  async activate(params) {
    this.storeParams = params;
    this.carId = params.id;
    await this.loadCar();
    this.comments = this.listComments;
  }

  async loadCar() {
    let response = await this.api.get(`/cars/${this.carId}`);
    this.make = response.make;
    this.model = response.model;
    this.year = response.year;
    this.numberOfTrips = response.numberOfTrips;
    this.gas = response.gas;
    this.numberOfDoors = response.numberOfDoors;
    this.horsePower = response.horsePower;
    this.litersPerKm = response.litersPerKm;
    this.description = response.description;
    this.guideLines = response.guideLines;
    this.reviews = response.reviews;
    this.price = response.price;
    this.locationPickUp = response.locationPickUp;
    this.features = response.features;
    this.carImages = response.carImages;
    this.rentFrom = response.rentedFrom;
    this.maxdate = response.rentedTo;
    this.ownerFullName = response.ownerFullName;
    this.listComments = response.listComments;
    this.transmission = response.transmission;
    this.userId = response.userId;
    this.totalTrips = response.totalTrips;

    this.containsFeature("usb") === true ? this.usb = true : this.usb = false;
    this.containsFeature("ecodrive") === true ? this.ecodrive = true : this.ecodrive = false;
    this.containsFeature("gps") === true ? this.gps = true : this.gps = false;
    this.containsFeature("tiptronic") === true ? this.tiptronic = true : this.tiptronic = false;
    this.containsFeature("audioinput") === true ? this.audioinput = true : this.audioinput = false;
    this.containsFeature("sportmode") === true ? this.sportmode = true : this.sportmode = false;

    for (var i = 0; i < this.carImages.length; i++) {
      this.listOfImages.push(`https://localhost:44319/api/images/${this.carImages[i]}`);
    }
    this.carProfilePicture = this.listOfImages[0];
    this.listOfImagesLength = this.listOfImages.length;
    this.start = this.rentFrom;
    this.end = this.rentTo;
    this.maxdate = this.rentTo;

  }

  deactivate() {
    // this.subscription.dispose();
  }
  
  async attached() {
    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;

    this.UserId = this.currentUserId;
    this.UserImage = await this.userProfilePicture(this.UserId);

    this.subscription = this.eventAggregator.subscribe(RefreshEvent, () => {
      this.activate(this.storeParams);
    });
  }

  containsFeature(feature) {
    const index = this.features.indexOf(feature);
    if (index > -1) {
      return true;
    }
    else {
      return false;
    }
  }

   navigateToCheckout() {
    this.router.navigate(`/app/checkout/${this.carId}`).then(()=>{
       this.eventAggregator.publish(new CheckoutEvent(this.userId,this.make,this.model,this.year,this.rentFrom,this.rentTo,this.locationPickUp,this.price,this.carProfilePicture));
    });

  }
  handleDateChangeStart(e: CustomEvent) {
    this.rentFrom = e.detail.startDate;
  }

  handleDateChangeEnd(e: CustomEvent) {
    this.rentTo = e.detail.startDate;
  }
  async userProfilePicture(userId) {
    this.user = new User(await this.api.get(`/users/${userId}`));
    return `/storage/${this.user.avatarUri.container}/${this.user.avatarUri.file}?` + Date.now();
  }


  // carouselSlider() {
  //   var self = this;
  //   this.slider = $(this.carousel);

  //   $(document).ready(function () {
  //     $('.carousel').carousel({
  //       interval: 5000,
  //       pause: false
  //     })

  //     for (let j = 0; j < self.listOfImages.length; j++) {
  //       let image = self.listOfImages[j];
  //       $('<div class="carousel-item"><img src=' + image + ' width="50%">   </div>').appendTo('.carousel-inner');
  //       $('<li data-target="#carousel" data-slide-to="' + j + '"></li>').appendTo('.carousel-indicators')
  //     }

  //     $('.carousel-item').first().addClass('active');
  //     $('.carousel-indicators > li').first().addClass('active');

  //     $('a[data-slide="prev"]').click(function () {
  //       $(self.carousel).carousel('prev');
  //     });

  //     $('a[data-slide="next"]').click(function () {
  //       $(self.carousel).carousel('next');
  //     });

  //     self.slider.carousel();
  //   });
  // }

}
