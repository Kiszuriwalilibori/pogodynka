import { useQuery } from "@tanstack/react-query";

import { useProcessCurrentData } from "hooks";
import { getValue, getWeather, selectParamsForComparision } from "js/functions";
import { Description } from "types";
import { usePlaceContext } from "contexts/placeContext";
import { useGetSpeakableWeatherDescription } from "./useGetSpeakableWeatherDescription";

export const useFetchCurrentWeather = () => {
  const { weatherURL } = { ...usePlaceContext().place };
  const { data, isLoading: isCurrentWeatherLoading } = useQuery([weatherURL], () => getWeather(weatherURL));
  const currentWeatherDataForComparision = data ? selectParamsForComparision(data) : undefined;
  const currentWeatherData = useProcessCurrentData(data);
  const weatherDescription: string = data ? getValue(data, "description") : undefined;
  const icon: string = data ? getValue(data, "icon") : undefined;
  const descriptionData: Description = weatherDescription && icon ? { weatherDescription, icon } : undefined;
  const speakableWeatherDescription = useGetSpeakableWeatherDescription(currentWeatherData, weatherDescription);

  return {
    currentWeatherData,
    isCurrentWeatherLoading,
    currentWeatherDataForComparision,
    descriptionData,
    speakableWeatherDescription,
  };
};

export default useFetchCurrentWeather;
