const WEATHER_ICON_SIZE_FACTOR: string = "@2x.png";
const WEATHER_ICON_CORE_URL: string = "http://openweathermap.org/img/wn/";
/**
 * Creates URL of given weather icon
 * @param icon represents desired icon
 * @returns complete URL to icon in API resources
 */

export function createWeatherIconURL(icon: string): string {
  return WEATHER_ICON_CORE_URL + icon + WEATHER_ICON_SIZE_FACTOR;
}
