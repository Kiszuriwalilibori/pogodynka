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

type RelationItem = [string, string, string];
interface Relation {
  [key: string]: RelationItem;
}
const relations: Relation = {
  temp: ["zimniej", "tak samo", "cieplej"],
  pressure: ["niższe", "takie samo", "wyższe"],
  humidity: ["niższa", "taka sama", "wyższa"],
};

export const currentArray: (keyof typeof Params)[] = ["temp", "feels_like", "humidity", "pressure"];
export const forecastArray: (keyof typeof Params)[] = ["temp", "pressure", "humidity", "feels_like"];
export const forecastPrefix = { field: "date", headerName: "Data i godzina" };

export const comparisionArray: (keyof typeof Params)[] = [
  "temp",
  "feels_like",
  "temp_min",
  "temp_max",
  "pressure",
  "humidity",
];
export const comparisionPrefix = [
  { field: "place", headerName: "Miejsce" },
  { field: "description", headerName: "Opis" },
];

interface WeatherParameterConfigItem {
  name: string;
  unit: Units;
  decimalPlaces: DecimalPlaces;
  relation: RelationItem;
  hasPriority: boolean;
  header?: string;
}
type WeatherConfig = {
  [key in keyof typeof Params]: WeatherParameterConfigItem;
};

export const weatherConfig: WeatherConfig = {
  temp: { name: "Temperatura", unit: "°C", decimalPlaces: 1, relation: relations.temp, hasPriority: true },
  humidity: { name: "Wilgotność", unit: "%", decimalPlaces: 0, relation: relations.humidity, hasPriority: false },
  feels_like: { name: "T. odczuwalna", unit: "°C", decimalPlaces: 0, relation: relations.temp, hasPriority: false },
  pressure: { name: "Ciśnienie", unit: "hPa", decimalPlaces: 0, relation: relations.pressure, hasPriority: false },
  temp_min: { name: "T. minimalna", unit: "°C", decimalPlaces: 0, relation: relations.temp, hasPriority: false },
  temp_max: { name: "T. maksymalna", unit: "°C", decimalPlaces: 0, relation: relations.temp, hasPriority: false },
};

function addHeader(weatherConfigItem: WeatherParameterConfigItem) {
  weatherConfigItem.header = weatherConfigItem.name + " [ " + weatherConfigItem.unit + " ]";
}
export function addHeaders(weatherConfig: WeatherConfig) {
  for (const item in weatherConfig) {
    addHeader(weatherConfig[item]);
  }
}

export function copySelectedWeatherProperties(
  selectionArray: (keyof typeof Params)[],
  object: { [key: string]: string | number }
) {
  const result = {} as any;
  selectionArray.forEach(item => {
    result[item] = getValue(object, item) ? getValue(object, item) : "n/a";
  });
  return result;
}
