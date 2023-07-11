import { useQueries } from "@tanstack/react-query";

import getWeather from "js/functions/getWeather";
import useGetParamsForComparision from "./useGetParamsForComparision";

import { FavoriteItemWeatherWithEndpointLabel } from "types";

export const useFetchComparision = () => {
  const { label, endpoints } = useGetParamsForComparision();
  const roughData = useQueries({
    queries: endpoints.map(endpoint => {
      return {
        queryKey: ["comparision", endpoint.label],
        queryFn: () => getWeather(endpoint.url),
        select: (data: any) => {
          return { ...data, endpointLabel: endpoint.label };
        },
      };
    }),
  });
  const favoritesWeatherDataForComparision = roughData
    .map(item => item.data)
    .filter(item => Boolean(item)) as FavoriteItemWeatherWithEndpointLabel[];
  const isComparisionLoading = roughData.some(query => query.isLoading);
  const isComparisionError = roughData.some(result => result.isError);
  return { favoritesWeatherDataForComparision, isComparisionLoading, isComparisionError, label };
};

export default useFetchComparision;
