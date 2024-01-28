import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { TFunction } from "i18next";

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

export type Source = "city" | "location" | "favorites" | "current";

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

export type ComparisionResult =
  | {
      value: number;
      comment: string;
    }
  | string;

export const FormVariants = { ...PlaceVariants, ...favorites };
export interface ForecastDetails {
  list: [{ dt_txt: string }];
}

export type ComparableWeatherData = { [key in WeatherParameters]: number };

export type ExtendedThunkDispatch<T extends Action<any>> = ThunkDispatch<RootStateType, any, T>;

export interface Favorite {
  category: string;
  label: string;
  source: PlaceVariants;
  place: Position;
}

export interface WeatherDataWithEndpoint {
  endpointLabel: string;
  [key: string]: any;
}

export type Description =
  | undefined
  | {
      weatherDescription: string;
      icon: string;
    };

export type Translation = TFunction<"translation", undefined, "translation">;
