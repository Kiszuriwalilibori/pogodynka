import compareCurrentWithFavoriteWeather from "./compareCurrentWithFavoriteWeather";

import moment from "moment";

import {
  ForecastObject,
  ComparisionResult,
  ComparableWeatherData,
  WeatherParameters,
  FavoriteItemWeatherWithEndpointLabel,
} from "types";

import { getValue, selectParamsForComparision } from "js/functions";
import { comparision } from "models";
import { currentArray, weatherConfig, copySelectedWeatherProperties, forecastArray } from "models/Weather";

const processFetchedData = {
  /**
   * Formats fetched data of current place
   * @param data fetched data
   * @returns array of fetched data with units added and with desired number of decimal places
   */

  current: function (data: Object) {
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
  },

  /**
   * Combines fetched data for current place with place description in order to store it together
   * @param {*} data data for current place
   * @param {*} city current location
   * @returns data structure in desired format
   */
  // weather: function (data: Object | undefined, city: Position) {
  //   return { currentCity: city, currentCityData: data };
  // },
  // /**
  //  * Processes raw data fetched to prefereable structure
  //  * @param {*} data fetched data
  //  * @returns array containing arrays which contain date,time and forecasted weather params
  //  */

  forecast: function (data: ForecastObject) {
    const forecastsArray = { ...data }.list.map((item: any) => {
      return copySelectedWeatherProperties(forecastArray, item.main);
    });

    forecastsArray.forEach((forecast, index: number) => {
      forecast.date = moment(data.list[index].dt_txt).format("MMMM D, H:mm ");
      for (const property in forecast) {
        if (!isNaN(forecast[property])) {
          forecast[property] = Number(forecast[property]).toFixed(weatherConfig[property as any].decimalPlaces);
        }
      }
    });

    return forecastsArray;
  },

  /**
   * Combines both current and favorites weather data into single data structure
   * @param favoritesData
   * @param currentWeather
   * @returns array grouping other arrays. Each of these arrays contains place label and comparision data(value of given weather param in given place and descriptive comparision with current place)
   */
  comparision: function (
    favoritesData: FavoriteItemWeatherWithEndpointLabel[],
    currentWeather: ComparableWeatherData | undefined
  ) {
    if (favoritesData.length && currentWeather) {
      const selectedParamsCurrent = currentWeather;
      const selectedParamsFavorites: ComparableWeatherData[] = [];

      favoritesData.forEach(favorite => {
        const selection = selectParamsForComparision(favorite);
        selectedParamsFavorites.push(selection);
      });

      const generalDescriptionsFromFavorites: string[] = [];

      favoritesData.forEach(favorite => {
        const description = getValue(favorite, "description");
        generalDescriptionsFromFavorites.push(description);
      });

      const comparativeArray: (ComparisionResult | string)[][] = selectedParamsFavorites.map(item => {
        return compareCurrentWithFavoriteWeather(
          selectedParamsCurrent as ComparableWeatherData,
          item,
          comparision.parameters
        );
      });

      comparativeArray.forEach((item, index) => {
        generalDescriptionsFromFavorites[index]
          ? item.unshift(generalDescriptionsFromFavorites[index])
          : item.unshift("n/a");
        item.unshift(favoritesData[index].endpointLabel); //add as city names to the array from static table, if taken from API response would be without polish characters
      });
      const objectParameters = comparativeArray.map(item => {
        const result = {} as any;
        item.forEach((x: ComparisionResult | string, index) => {
          result[comparision.fields[index]] = x;
        });

        return result;
      });

      return objectParameters;
    }
  },
};
export default processFetchedData;
