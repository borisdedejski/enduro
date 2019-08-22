import { Router } from 'aurelia-router';
import { ApiService } from "shared/ApiService";
import { bindable, autoinject } from "aurelia-framework";
import * as L from 'leaflet';

@autoinject
export class Map {
  mapHolder: HTMLElement;
  map;
  carPoint: [number, number] = null;
  coordinates: any;
  coords: Array<any> = [];   //from the api
  latitude: any;
  longnitude: any;

  constructor(private api: ApiService, private router: Router) {
    this.coordinates = [];
  }

  async attached() {
    this.createMap();
  }

  createMap() {
    let urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let tiles = L.tileLayer(urlTemplate,
      {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
      });

    let latlng = L.latLng(41.995980, 21.425005);

    this.map = L.map(this.mapHolder, { center: latlng, zoom: 15, layers: [tiles] });
    this.loadPolyline();
  }
  async loadPolyline() {
    let response = await this.api.get('/map');
    this.coords = response.carLocations;
    if (typeof (this.coords) != "undefined") {

      var icon = L.icon({
        // iconUrl: 'https://www.materialui.co/materialIcons/toggle/radio_button_on_grey_192x192.png',
        iconUrl: 'https://i.stack.imgur.com/wN5QD.png',
        iconSize: [40, 40], // size of the icon
      });
      var self = this;

      var carPoint = null;
      var marker = [];
      for (var i = 0; i < this.coords.length; i++) {
        this.coordinates = [this.coords[i].coordinate.latitude, this.coords[i].coordinate.longitude]
        marker[i] = L.marker(this.coordinates, { icon: icon });
        marker[i].addTo(this.map);
        marker[i].on('click', async function (e) {
          this.latitude = e.latlng.lat;
          this.longnitude = e.latlng.lng;
          let response = await self.api.post(`/map`,
            {
              latitude: this.latitude,
              longitude: this.longnitude
            });
          if(response.carId!=undefined){
            self.router.navigate(`/app/cars/${response.carId}`)
          }
        })
      }
    }
  }

}
