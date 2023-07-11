import { Geolocation, PlaceVariants, Position } from "types";

const baseURL = "https://api.openweathermap.org/data/2.5/";

const prefix = {
  forecast: baseURL + "forecast?",
  weather: baseURL + "weather?",
};
/**
 * Creates core part of URL
 * @param place describes actual place for which weather is wanted
 * @param source defines whether it is city defined by name or geolocation eefined byt object
 * @returns string being core part of URL
 */

function createCoreURL(place: Position, source: PlaceVariants): string {
  switch (source) {
    case PlaceVariants.CITY:
      return `q=${place as string}`;
    case PlaceVariants.LOCATION:
      return "lat=" + (place as Geolocation).latitude + "&lon=" + (place as Geolocation).longitude;
    default:
      return "";
  }
}

/**
 * Creates full URL
 * @param place describes actual place for which weather is wanted
 * @param source defines whether it is city defined by name or geolocation eefined byt object
 * @returns string representing URL
 */

const createURL = {
  forecast: (place: Position, source: PlaceVariants): string => {
    return `${prefix.forecast}${createCoreURL(place, source)}&units=metric&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }&lang=pl`;
  },

  weather: (place: Position, source: PlaceVariants): string => {
    return `${prefix.weather}${createCoreURL(place, source)}&units=metric&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }&lang=pl`;
  },
};

export default createURL;
