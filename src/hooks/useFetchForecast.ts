import { useQuery } from "@tanstack/react-query";

import getWeather from "js/functions/getWeather";

import { usePlaceContext } from "contexts/placeContext";

export const useFetchForecast = () => {
  const { forecastURL } = { ...usePlaceContext().place };
  const { data, isError, error, isLoading } = useQuery([forecastURL], () => getWeather(forecastURL));

  return { data, isError, error, isLoading };
};

export default useFetchForecast;
