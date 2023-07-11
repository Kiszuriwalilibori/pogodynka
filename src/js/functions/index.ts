import compareCurrentWithFavoriteWeather from "./compareCurrentWithFavoriteWeather";
import createURL from "./createURL";
import processFetchedData from "./processFetchedData";
import getSeason from "./getSeason";
import setBackground from "./setBackground";
import breakWhenInternetExplorer from "./breakWhenInternetExplorer";
import getValue from "./getValue";
import getWeather from "./getWeather";
import selectParamsForComparision from "./selectParamsForComparision";
import { LocalStorage, FilteredStorage } from "./localStorage";
import { Place } from "./place";
import { PlaceType } from "types";

export {
  breakWhenInternetExplorer,
  compareCurrentWithFavoriteWeather,
  createURL,
  FilteredStorage,
  getSeason,
  getWeather,
  getValue,
  LocalStorage,
  Place,
  processFetchedData,
  selectParamsForComparision,
  setBackground,
};
export type { PlaceType };
