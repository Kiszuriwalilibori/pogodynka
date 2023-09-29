import i18next from "i18next";

import { Parameter } from "./weather";

export const forecastArray: Parameter[] = ["temp", "pressure", "humidity", "feels_like"];

export function getForecastPrefix() {
  return { field: "date", headerName: i18next.t("model-weather.forecast_prefix") };
}
