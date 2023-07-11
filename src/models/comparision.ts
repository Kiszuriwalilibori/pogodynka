import { WeatherParameters, Units } from "types";
import toArray from "./common/toArray";

enum ComparisionItems { // this enum keeps order of comparision items
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
}

type RelationDescriptions = { [key: string]: [string, string, string] };
const temperatureRelationDescription: [string, string, string] = ["zimniej", "taka sama", "cieplej"];
const relationDescriptions: RelationDescriptions = {
  temp: temperatureRelationDescription,
  feels_like: temperatureRelationDescription,
  temp_min: temperatureRelationDescription,
  temp_max: temperatureRelationDescription,
  pressure: ["niższe", "takie samo", "wyższe"],
  humidity: ["niższa", "taka sama", "wyższa"],
};

type ComparisionHeaders =
  | "Temperatura"
  | "T. odczuwalna"
  | "T. minimalna"
  | "T. maksymalna"
  | "Ciśnienie"
  | "Wilgotność";

type Headers = {
  [key in ComparisionItems]: ComparisionHeaders;
};

const headers: Headers = {
  [ComparisionItems.temp]: "Temperatura",
  [ComparisionItems.feels_like]: "T. odczuwalna",
  [ComparisionItems.temp_min]: "T. minimalna",
  [ComparisionItems.temp_max]: "T. maksymalna",
  [ComparisionItems.humidity]: "Wilgotność",
  [ComparisionItems.pressure]: "Ciśnienie",
};

type Parameters = {
  [key in ComparisionItems]: WeatherParameters;
};

const parameters: Parameters = {
  [ComparisionItems.temp]: "temp",
  [ComparisionItems.feels_like]: "feels_like",
  [ComparisionItems.temp_min]: "temp_min",
  [ComparisionItems.temp_max]: "temp_max",
  [ComparisionItems.humidity]: "humidity",
  [ComparisionItems.pressure]: "pressure",
};

type ParamUnits = {
  [key in ComparisionItems]: Units;
};

const paramUnits: ParamUnits = {
  [ComparisionItems.temp]: "°C",
  [ComparisionItems.feels_like]: "°C",
  [ComparisionItems.temp_min]: "°C",
  [ComparisionItems.temp_max]: "°C",
  [ComparisionItems.humidity]: "%",
  [ComparisionItems.pressure]: "hPa",
};

const comparision = {
  headers: toArray(headers),
  relation: relationDescriptions,
  parameters: toArray(parameters),
  parameterUnits: toArray(paramUnits),
  readableNames: ["miejsce", "opis", ...toArray(headers)],
  fields: ["place", "description", ...toArray(parameters)],
};

export default comparision;

// tdo pytanie na ile jest to aktualne, poszły wszakże updaty i może idzie obejść się bez toArray itp
