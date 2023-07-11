import { comparisionArray } from "models/Weather";
import { ComparableWeatherData } from "types";
import getValue from "./getValue";

export function selectParamsForComparision(weather: Object) {
  const comparisionObject = {} as ComparableWeatherData;

  comparisionArray.forEach(element => {
    comparisionObject[element] = getValue(weather, element);
  });

  return comparisionObject;
}

export default selectParamsForComparision;
