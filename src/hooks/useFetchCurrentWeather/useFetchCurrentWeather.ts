import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { usePlaceContext } from "contexts/placeContext";
import { getValue, getWeather, selectParamsForComparision } from "js/functions";
import * as ROUTES from "routes";
import { Description, PlaceType } from "types";

import { useProcessCurrentData,useDispatchAction } from "hooks";
import { useGetSpeakableWeatherDescription } from "./useGetSpeakableWeatherDescription";

export const useFetchCurrentWeather = () => {
  const { showErrorMessage } = useDispatchAction();
  const { place, setPlace } = usePlaceContext();
  const { weatherURL } = { ...place };
  const navigate = useNavigate();
  
  const { 
    data, 
    isLoading: isCurrentWeatherLoading
  } = useQuery({
    queryKey: [weatherURL],
    queryFn: () => getWeather(weatherURL),
    onError: (error: Error) => {
      showErrorMessage(`Weather data error: ${error.message}`);
      setPlace({} as PlaceType);
      navigate(ROUTES.SEARCH);
    },
    retry: false,
    refetchOnWindowFocus: false
  });

  const currentWeatherDataForComparision = data ? selectParamsForComparision(data) : undefined;
  const currentWeatherData = useProcessCurrentData(data || null);
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
