var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Router } from 'aurelia-router';
import { ApiService } from "shared/ApiService";
import { autoinject } from "aurelia-framework";
import * as L from 'leaflet';
var Map = /** @class */ (function () {
    function Map(api, router) {
        this.api = api;
        this.router = router;
        this.carPoint = null;
        this.coords = []; //from the api
        this.coordinates = [];
    }
    Map.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.createMap();
                return [2 /*return*/];
            });
        });
    };
    Map.prototype.createMap = function () {
        var urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tiles = L.tileLayer(urlTemplate, {
            maxZoom: 18,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
        });
        var latlng = L.latLng(41.995980, 21.425005);
        this.map = L.map(this.mapHolder, { center: latlng, zoom: 15, layers: [tiles] });
        this.loadPolyline();
    };
    Map.prototype.loadPolyline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, icon, self, carPoint, marker, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('/map')];
                    case 1:
                        response = _a.sent();
                        this.coords = response.carLocations;
                        if (typeof (this.coords) != "undefined") {
                            icon = L.icon({
                                // iconUrl: 'https://www.materialui.co/materialIcons/toggle/radio_button_on_grey_192x192.png',
                                iconUrl: 'https://i.stack.imgur.com/wN5QD.png',
                                iconSize: [40, 40],
                            });
                            self = this;
                            carPoint = null;
                            marker = [];
                            for (i = 0; i < this.coords.length; i++) {
                                this.coordinates = [this.coords[i].coordinate.latitude, this.coords[i].coordinate.longitude];
                                marker[i] = L.marker(this.coordinates, { icon: icon });
                                marker[i].addTo(this.map);
                                marker[i].on('click', function (e) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var response;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    this.latitude = e.latlng.lat;
                                                    this.longnitude = e.latlng.lng;
                                                    return [4 /*yield*/, self.api.post("/map", {
                                                            latitude: this.latitude,
                                                            longitude: this.longnitude
                                                        })];
                                                case 1:
                                                    response = _a.sent();
                                                    if (response.carId != undefined) {
                                                        self.router.navigate("/app/cars/" + response.carId);
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Map = __decorate([
        autoinject,
        __metadata("design:paramtypes", [ApiService, Router])
    ], Map);
    return Map;
}());
export { Map };
//# sourceMappingURL=map.js.map