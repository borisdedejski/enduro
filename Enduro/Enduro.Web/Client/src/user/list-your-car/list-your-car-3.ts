import { UserService } from './../../shared/UserService';
import { SharedService } from './../../shared/SharedService';
import { CarDetailsEvent } from './CarDetailsEvent';
import { CarEvent } from './CarEvent';
import { ApiService } from './../../shared/ApiService';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { ListCarPrompt } from "resources/elements/prompts/list-car-prompt/list-car-prompt";
import { EventAggregator } from 'aurelia-event-aggregator';
import * as  moment from 'moment';


class Car {
  userId: any;
  locationCountry: any;
  addressForPickUp: any;
  driverLicenseNo: any;
  mobileNumber: any;
  carMake: any;
  carModel: any;
  carYear: any;
  carGas: any;
  rentFrom: any;
  rentTo: any;
  selectedTransmission: any;
  selectedDoors: number;
  carHorsePower: any;
  carLiters: any;
  carDescription: any;
  features: any;
  selectedHorsePower: any;
  carGuideline: any;
  carInsurance: any;
  carLocationCity: any;
  carPrice: any;
  carClass: any;
  CarImages: any;
}
class User {
  fullName: any;
  driverLicenseNo: any;
  mobileNumber: any;
}

@autoinject
export class ListYourCarStep3 {
  currentCar: any;
  selectedFiles: any;

  listOfImages: any;
  imageId: any;
  subscription: any;
  //Variables from First Event (CarEvent)
  fullName: string;
  locationCountry: string;
  addressForPickUp: string;
  driverLicenseNo: string;
  mobileNumber: string;
  //Variables from the Second Event (CarDetailsEvent)
  carMake: any
  carModel: any
  carYear: any
  carGas: any
  rentFrom: any
  rentTo: any;
  selectedTransmission: any;
  selectedDoors: number;
  carHorsePower: any;
  carLiters: any;
  carDescription: any;
  usb: any;
  gps: any;
  tiptronic: any;
  audioinput: any;
  ecodrive: any;
  sportmode: any;
  selectedHorsePower: any;
  carGuideline: any;
  carInsurance: any;
  carLocationCity: any;
  carPrice: any;
  carClass: any;


  CarInfo: any; // this is for listingcar 
  //List of car images with every info
  CarImages: any;

  car: Car;
  user: User;
  carFeatureList: any;

  //auth
  currentUser: any;
  currentUserId: any;
  constructor(private router: Router, private dialog: DialogService, private api: ApiService,
    private eventAggregator: EventAggregator,
    private sharedService: SharedService,
    private userService: UserService) {
    this.CarImages = [];
    this.listOfImages = [];
    this.carFeatureList = [];

    this.subscription = this.eventAggregator.subscribe(CarEvent, (msg) => {
      this.fullName = msg.fullName,
        this.locationCountry = msg.locationCountry,
        this.addressForPickUp = msg.addressForPickUp,
        this.driverLicenseNo = msg.driverLicenseNo,
        this.mobileNumber = msg.mobileNumber
    })

    this.subscription = this.eventAggregator.subscribe(CarDetailsEvent, (msg) => {
      this.carMake = msg.carMake,
        this.carModel = msg.carModel,
        this.carYear = msg.carYear,
        this.carGas = msg.carGas,
        this.rentFrom = msg.rentFrom,
        this.rentTo = msg.rentTo,
        this.selectedTransmission = msg.selectedTransmission,
        this.selectedDoors = msg.selectedDoors,
        this.carHorsePower = msg.carHorsePower,
        this.carLiters = msg.carLiters,
        this.carDescription = msg.carDescription,
        this.usb = msg.usb,
        this.gps = msg.usb,
        this.tiptronic = msg.tiptronic,
        this.audioinput = msg.audioinput,
        this.ecodrive = msg.ecodrive,
        this.sportmode = msg.sportmode,
        this.selectedHorsePower = msg.selectedHorsePower,
        this.carGuideline = msg.carGuideline,
        this.carInsurance = msg.carInsurance,
        this.carLocationCity = msg.carLocationCity,
        this.carPrice = msg.carPrice,
        this.carClass = msg.carClass
    });
  }

  async activate() {
    // await this.api.deleteAll('/images'); // we do this because we want to store the images that are appended to car and not just uploaded
  }
  async attached() {
    this.currentUser = await this.api.getCurrentUser();
    this.currentUserId = this.currentUser.id;
  }
  deactivate() {
    this.subscription.dispose();
  }

  async upload() {
    let formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append(`files[${i}]`, this.selectedFiles[i]);
    }
    let response = await this.api.upload("/images", formData);
    this.imageId = response.imageId;
    this.listOfImages.push([`https://localhost:44319/api/images/${this.imageId}`, `${this.imageId}`]);
    this.CarImages.push(this.imageId)
  }

  async deleteImage(image) {
    const index = this.CarImages.indexOf(image[1]);
    if (index > -1) {
      await this.api.delete(`/images/${image[1]}`) // to not store images that are uploaded before
      this.CarImages.splice(index, 1);
      this.listOfImages.splice(index,1);
    }
  }

  navigateToStep2() {
    this.router.navigate('listyourcar-2')
  }

  async confirmList() {
    this.user = new User
    {
      this.user.fullName = this.fullName,
        this.user.mobileNumber = this.mobileNumber,
        this.user.driverLicenseNo = this.driverLicenseNo
    }
    this.usb ? this.carFeatureList.push("usb") : false;
    this.tiptronic ? this.carFeatureList.push("tiptronic") : false;
    this.audioinput ? this.carFeatureList.push("audioinput") : false;
    this.ecodrive ? this.carFeatureList.push("ecodrive") : false;
    this.sportmode ? this.carFeatureList.push("sportmode") : false;

    this.car = new Car
    {
      // this.car.userId = "96ece075-330f-440a-b029-a05a472e782f",
        this.car.userId = this.currentUserId,
        this.car.carMake = this.carMake,
        this.car.carModel = this.carModel,
        this.car.carYear = Number(this.carYear),
        this.car.carGas = this.carGas,
        this.car.selectedDoors = Number(this.selectedDoors),
        this.car.carHorsePower = Number(this.carHorsePower),
        this.car.carLiters = Number(this.carLiters),
        this.car.carDescription = this.carDescription,
        this.car.carGuideline = this.carGuideline,
        this.car.carPrice = Number(this.carPrice),
        this.car.carLocationCity = this.carLocationCity,
        this.car.locationCountry = this.locationCountry,
        this.car.addressForPickUp = this.addressForPickUp,
        this.car.features = this.carFeatureList,
        this.car.carInsurance = this.carInsurance,
        this.car.CarImages = this.CarImages,
        this.car.rentFrom = moment(new Date(this.rentFrom)),
        this.car.rentTo = moment(new Date(this.rentTo)),
        this.car.carClass = this.carClass,
        this.car.selectedTransmission = this.selectedTransmission

      // this.car.driverLicenseNo = this.driverLicenseNo,
      // this.car.mobileNumber = this.mobileNumber,
      // this.car.selectedHorsePower = this.selectedHorsePower,
    }
    //TODO for the edit



    await this.sharedService.saveData(this.car)
    await this.userService.saveData(this.user)
    this.dialog.open({ viewModel: ListCarPrompt, model: 'Confirm prompt', lock: true });
  }

}

