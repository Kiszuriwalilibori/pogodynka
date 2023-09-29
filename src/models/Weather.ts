import i18next from "i18next";

import { Units } from "types";
import { getValue } from "js/functions";

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
type DecimalPlaces = 0 | 1 | 2 | 3;

export enum Params {
  temp,
  feels_like,
  humidity,
  pressure,
  temp_min,
  temp_max,
}

export type Parameter = keyof typeof Params;

export const currentArray: Parameter[] = ["temp", "feels_like", "humidity", "pressure"];

export interface WeatherParameterConfigItem {
  name: string;
  unit: Units;
  decimalPlaces: DecimalPlaces;
  hasPriority: boolean;
  header?: string;
}
export type WeatherConfig = {
  [key in keyof typeof Params]: WeatherParameterConfigItem;
};

export const weatherConfig: WeatherConfig = {
  temp: {
    name: "temp",
    unit: "°C",
    decimalPlaces: 1,
    hasPriority: true,
  },
  humidity: { name: "humidity", unit: "%", decimalPlaces: 0, hasPriority: false },
  feels_like: { name: "feels_like", unit: "°C", decimalPlaces: 0, hasPriority: false },
  pressure: { name: "pressure", unit: "hPa", decimalPlaces: 0, hasPriority: false },
  temp_min: { name: "temp_min", unit: "°C", decimalPlaces: 0, hasPriority: false },
  temp_max: { name: "temp_max", unit: "°C", decimalPlaces: 0, hasPriority: false },
};

export function getWeatherConfig() {
  // nieużywana
  return {
    temp: {
      name: i18next.t("model-weather.name"),
      unit: "°C",
      decimalPlaces: 1,

      hasPriority: true,
    },
    humidity: {
      name: i18next.t("model-weather.humidity"),
      unit: "%",
      decimalPlaces: 0,
      hasPriority: false,
    },
    feels_like: {
      name: i18next.t("model-weather.feels_like"),
      unit: "°C",
      decimalPlaces: 0,
      hasPriority: false,
    },
    pressure: {
      name: i18next.t("model-weather.pressure"),
      unit: "hPa",
      decimalPlaces: 0,
      hasPriority: false,
    },
    temp_min: {
      name: i18next.t("model-weather.temp_min"),
      unit: "°C",
      decimalPlaces: 0,
      hasPriority: false,
    },
    temp_max: {
      name: i18next.t("model-weather.temp_max"),
      unit: "°C",
      decimalPlaces: 0,
      hasPriority: false,
    },
  };
}

function addHeader(weatherConfigItem: WeatherParameterConfigItem) {
  weatherConfigItem.header =
    i18next.t("model-weather." + weatherConfigItem.name) + " [ " + weatherConfigItem.unit + " ]";
}
export function addHeaders(weatherConfig: WeatherConfig) {
  for (const item in weatherConfig) {
    addHeader(weatherConfig[item]);
  }
}

export function copySelectedWeatherProperties(selectionArray: Parameter[], object: { [key: string]: string | number }) {
  const result = {} as any;
  selectionArray.forEach(item => {
    result[item] = getValue(object, item) ? getValue(object, item) : "n/a";
  });
  return result;
}
