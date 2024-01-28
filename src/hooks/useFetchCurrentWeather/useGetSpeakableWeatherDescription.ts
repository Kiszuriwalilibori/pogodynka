import { useTranslation } from "react-i18next";

import { usePlaceContext } from "contexts";
import { getSpeakableIntro } from "./getSpeakableIntro";
import { getSpeakablePlace } from "./getSpeakablePlace";
import { currentArray, weatherConfig } from "models";
import { useMemo } from "react";

export const useGetSpeakableWeatherDescription = (
  currentWeatherData: string[] | undefined,
  weatherDescription: string
) => {
  const { t } = useTranslation();
  const { type, place } = { ...usePlaceContext().place };
  const speakableIntro = useMemo(() => getSpeakableIntro(t, type), [type]);
  const speakablePlace = useMemo(() => getSpeakablePlace(t, type, place), [type, place]);

  let speakableWeatherDescription: string;

  if (currentWeatherData) {
    const textArray = currentWeatherData.map((item, index, ary) => {
      const config = weatherConfig[currentArray[index]];
      const desc = `${t("model-weather." + config?.name)} ${ary[index]}`;
      return desc;
    });

    const textDescription = textArray.join(", ");

    const text = speakableIntro + " " + speakablePlace + ": " + weatherDescription + ". " + textDescription;
    speakableWeatherDescription = text;
  } else {
    speakableWeatherDescription = "";
  }

  return speakableWeatherDescription;
};

export default useGetSpeakableWeatherDescription;
