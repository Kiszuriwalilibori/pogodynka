import { useQuery } from "@tanstack/react-query";

import { useProcessCurrentData } from "hooks";
import { getValue, getWeather, selectParamsForComparision } from "js/functions";
import { Description } from "types";
import { usePlaceContext } from "contexts/placeContext";
import { useTranslation } from "react-i18next";
import { currentArray, weatherConfig } from "models";

export const useFetchCurrentWeather = () => {
  const { t } = useTranslation();
  const { weatherURL } = { ...usePlaceContext().place };

  const { data, isLoading: isCurrentWeatherLoading } = useQuery([weatherURL], () => getWeather(weatherURL));

  const currentWeatherDataForComparision = data ? selectParamsForComparision(data) : undefined;
  const currentWeatherData = useProcessCurrentData(data);
  const weatherDescription: string = data ? getValue(data, "description") : undefined;
  const icon: string = data ? getValue(data, "icon") : undefined;
  const descriptionData: Description = weatherDescription && icon ? { weatherDescription, icon } : undefined;

  let voiceDescriptionText: string;

  if (currentWeatherData) {
    const textArray = currentWeatherData.map((item, index, ary) => {
      const config = weatherConfig[currentArray[index]];
      const desc = `${t("model-weather." + config?.name)} ${ary[index]}`;
      return desc;
    });

    const textDescription = textArray.join(", ");

    const text = t("page-weather.weather_today") + ": " + weatherDescription + ". " + textDescription;
    voiceDescriptionText = text;
  } else {
    voiceDescriptionText = "";
  }

  return {
    currentWeatherData,
    isCurrentWeatherLoading,
    currentWeatherDataForComparision,
    descriptionData,
    voiceDescriptionText,
  };
};

export default useFetchCurrentWeather;
