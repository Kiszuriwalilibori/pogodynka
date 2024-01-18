import { Fade } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";
import { useTranslation } from "react-i18next";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { VisualDescriptionPaper } from "./VisualDescription.styles";
import { createWeatherIconURL } from "./utils";
import { useEffect } from "react";

const VisualDescription = () => {
  const { descriptionData: data } = useFetchCurrentWeather();
  const { t } = useTranslation();
  const { speak, voices } = useSpeechSynthesis();

  useEffect(() => {
    if (data && data.weatherDescription) {
      const text = t("page-weather.weather_today") + ": " + data.weatherDescription;
      speak({ text: text, voice: voices[2] });
    }
  }, [JSON.stringify(data)]);

  if (!data) return null;

  const { icon, weatherDescription } = data;

  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_LONG}>
      <VisualDescriptionPaper variant="dark" elevation={2}>
        <img src={createWeatherIconURL(icon)} alt="weather"></img>
        {weatherDescription}
      </VisualDescriptionPaper>
    </Fade>
  );
};

export default VisualDescription;
