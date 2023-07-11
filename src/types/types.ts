import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "components";

enum favorites {
  FAVORITES = "favorites",
}

export enum ReportVariants {
  FORECAST = "forecast",
  WEATHER = "weather",
  COMPARISION = "comparision",
  CURRENT = "current",
}

export type Units = "°C" | "hPa" | "°K" | "%" | "";

export type PermittedPlaceVariants = "city" | "location" | "favorites";

export type WeatherParameters =
  | "temp"
  | "feels_like"
  | "humidity"
  | "pressure"
  | "temp_min"
  | "temp_max"
  | "description"
  | "icon"
  | "dt_txt";

export enum PlaceVariants {
  CITY = "city",
  LOCATION = "location",
}
export interface Geolocation {
  latitude: Number;
  longitude: Number;
}

export type Position = Geolocation | string;
export interface ComparisionObject {
  value: number;
  comment: string;
}

export const FormVariants = { ...PlaceVariants, ...favorites };
export interface ForecastObject {
  list: [{ dt_txt: string }];
}

export type ComparableWeatherData = { [key in WeatherParameters]: number };

export interface ComparisionResult {
  value: number;
  comment: string;
}

export type ExtendedThunkDispatch<T extends Action<any>> = ThunkDispatch<RootStateType, any, T>;

export interface FavoritesItem {
  category: string;
  label: string;
  source: PlaceVariants;
  place: Position;
}

export interface FavoriteItemWeatherWithEndpointLabel {
  endpointLabel: string;
  [key: string]: any;
}

export type Description =
  | undefined
  | {
      weatherDescription: string;
      icon: string;
    };
