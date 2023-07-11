import getValue from "js/functions/getValue";
import { weatherConfig, currentArray } from "models/Weather";
import { WeatherParameters } from "types";

export default function processData(data: Object) {
  function createWeatherParametersWithUnits(data: object, item: WeatherParameters, index: number) {
    const value = getValue(data, item);
    if (!value) return "n/a";
    const propertyParameters = weatherConfig[currentArray[index]];
    return value.toFixed(propertyParameters?.decimalPlaces) + propertyParameters?.unit;
  }
  const weatherParametersWithUnitsArray = currentArray.map((item, index) => {
    return createWeatherParametersWithUnits(data, item, index);
  });

  return weatherParametersWithUnitsArray;
}
