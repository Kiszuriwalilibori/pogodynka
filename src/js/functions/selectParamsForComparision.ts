// import { comparisionArray } from "models/Weather";
import { comparisonArray } from "models";
import { ComparableWeatherData } from "types";
import getValue from "./getValue";

export function selectParamsForComparision(weather: Object) {
  const comparisonObject = {} as ComparableWeatherData;

  comparisonArray.forEach(element => {
    comparisonObject[element] = getValue(weather, element);
  });

  return comparisonObject;
}

export default selectParamsForComparision;
