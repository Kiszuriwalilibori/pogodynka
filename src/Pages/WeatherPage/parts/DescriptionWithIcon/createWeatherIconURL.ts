export const weatherIconSizeFactor: string = "@2x.png";
const weatherIconCoreURL: string = "http://openweathermap.org/img/wn/";
/**
 * Creates URL of given weather icon
 * @param icon represents desired icon
 * @returns complete URL to icon in API resources
 */

function createWeatherIconURL(icon: string): string {
  return weatherIconCoreURL + icon + weatherIconSizeFactor;
}

export default createWeatherIconURL;
