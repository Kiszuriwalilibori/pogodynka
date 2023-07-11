import createURL from "./createURL";

import { PlaceVariants, Geolocation, Position } from "types";

export class Place {
  type: PlaceVariants;
  place: Position;
  isFromFavorites: boolean;
  forecastURL: string;
  weatherURL: string;
  label: string;
  redirectURL: string;
  labelComparision: string;
  labelForecast: string;
  labelCurrent: string;

  constructor(type: PlaceVariants, place: Position, isFromFavorites = false) {
    this.type = type;
    this.place = place;
    this.isFromFavorites = isFromFavorites;
    this.forecastURL = createURL.forecast(place as Geolocation, type);
    this.weatherURL = createURL.weather(place as Geolocation, type);

    switch (this.type) {
      case PlaceVariants.CITY:
        this.label = this.place as string;
        break;
      case PlaceVariants.LOCATION:
        this.label = `Lat.: ${(this.place as Geolocation).latitude.toFixed(4)} Lon.: ${(
          this.place as Geolocation
        ).longitude.toFixed(4)}`;
        break;
      default:
        this.label = "non-specified value (type) passed to  createLabelforHeader method";
    }

    switch (this.type) {
      case PlaceVariants.CITY:
        this.redirectURL = `/${this.place}`;
        break;
      case PlaceVariants.LOCATION:
        this.redirectURL = `/Latitude: ${(this.place as Geolocation).latitude} Longitude: ${
          (this.place as Geolocation).longitude
        }`;
        break;
      default:
        this.redirectURL = "non-specified value (type) passed to  redirectURL method";
    }

    this.labelComparision = `Porównanie pogody w ${this.label} i innych miejscach`;
    this.labelForecast = `Prognoza 3-dniowa dla ${this.label}`;
    this.labelCurrent = `Bieżąca pogoda dla ${this.label}`;
  }

  get getPlace() {
    return this.place;
  }
  get getType() {
    return this.type;
  }
}

export interface PlaceType extends Place {}
