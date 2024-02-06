import { useQuery } from "@tanstack/react-query";

import getWeather from "js/functions/getWeather";

import { usePlaceContext } from "contexts/placeContext";
import useProcessForecastData from "./useProcessForecastData";

export const useFetchForecast = () => {
  const { forecastURL } = { ...usePlaceContext().place };
  const { data, isLoading } = useQuery([forecastURL], () => getWeather(forecastURL));
  const forecastData = useProcessForecastData(data);

  return { forecastData, isLoading };
};

export default useFetchForecast;
