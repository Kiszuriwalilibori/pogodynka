import getComparison, {
  ComparisonParameter,
  ComparisonResults,
  comparisonArray,
  getComparisonPrefix,
} from "./comparison";

import { forecastArray, getForecastPrefix } from "./forecast";
import { addHeaders, copySelectedWeatherProperties, weatherConfig, Parameter, currentArray } from "./weather";

export {
  addHeaders,
  copySelectedWeatherProperties,
  comparisonArray,
  currentArray,
  forecastArray,
  getComparison,
  getComparisonPrefix,
  getForecastPrefix,
  weatherConfig,
};

export type { ComparisonParameter, ComparisonResults, Parameter };
