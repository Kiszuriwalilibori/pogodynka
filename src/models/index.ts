import getComparision, {
  ComparisionParameter,
  ComparisionResults,
  comparisionArray,
  getComparisionPrefix,
} from "./comparision";

import { forecastArray, getForecastPrefix } from "./forecast";
import { addHeaders, copySelectedWeatherProperties, weatherConfig, Parameter, currentArray } from "./weather";

export {
  addHeaders,
  copySelectedWeatherProperties,
  comparisionArray,
  currentArray,
  forecastArray,
  getComparision,
  getComparisionPrefix,
  getForecastPrefix,
  weatherConfig,
};

export type { ComparisionParameter, ComparisionResults, Parameter };
