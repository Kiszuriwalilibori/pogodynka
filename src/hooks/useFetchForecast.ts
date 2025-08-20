import { useQuery } from "@tanstack/react-query";

import { usePlaceContext } from "contexts";
import getWeather from "js/functions/getWeather";
import { useDispatchAction, useProcessForecastData } from "hooks";

export const useFetchForecast = () => {
  const { showErrorMessage } = useDispatchAction();
  const { place} = usePlaceContext();
  const { forecastURL } = { ...place };


  const { data, isLoading } = useQuery({
    queryKey: [forecastURL],
    queryFn: () => getWeather(forecastURL),
    onError: (error: Error) => {
      showErrorMessage(`Forecast data error: ${error.message}`);
      
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!forecastURL
  });

  const forecastData = useProcessForecastData(data || null);

  return { forecastData, isLoading };
};

export default useFetchForecast;
