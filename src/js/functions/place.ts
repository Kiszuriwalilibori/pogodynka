import createURL from "./createURL";
import i18next from "i18next";

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
    this.weatherURL = createURL.weather(place as Geolocation, type, i18next.language);

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
        this.label = i18next.t("place.invalid_header");
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
        this.redirectURL = i18next.t("place.invalid_URL");
    }

    this.labelComparision = ` ${i18next.t("place.comparision_pre")}  ${this.label} ${i18next.t(
      "place.comparision_post"
    )}`;
    this.labelForecast = `${i18next.t("place.forecast")} ${this.label}`;
    this.labelCurrent = `${i18next.t("place.current")} ${this.label}`;
  }

  get getPlace() {
    return this.place;
  }
  get getType() {
    return this.type;
  }
}

export interface PlaceType extends Place {}
