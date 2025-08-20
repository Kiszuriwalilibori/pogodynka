import { useQueries } from "@tanstack/react-query";

import getWeather from "js/functions/getWeather";
import { useDispatchAction,useGetParamsForComparison } from "hooks";

import { WeatherDataWithEndpoint } from "types";

export const useFetchComparison = () => {
  const { showErrorMessage } = useDispatchAction();
  const { label, endpoints } = useGetParamsForComparison();
  
  const roughData = useQueries({
    queries: endpoints.map(endpoint => ({
      queryKey: ["comparison", endpoint.label],
      queryFn: () => getWeather(endpoint.url),
      select: (data: any) => ({
        ...data,
        endpointLabel: endpoint.label
      }),
      onError: (error: Error) => {
        showErrorMessage(`Error loading comparison data: ${error.message}`);
      },
      retry: false,
      refetchOnWindowFocus: false
    }))
  });

  const favoritesWeatherDataForComparison = roughData
    .map(item => item.data)
    .filter(Boolean) as WeatherDataWithEndpoint[];
    
  const isComparisonLoading = roughData.some(query => query.isLoading);
  const isComparisonError = roughData.some(result => result.isError);
  
  return { 
    favoritesWeatherDataForComparison, 
    isComparisonLoading, 
    isComparisonError, 
    label 
  };
};

export default useFetchComparison;
