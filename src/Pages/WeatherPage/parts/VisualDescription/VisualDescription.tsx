import { Fade } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { VisualDescriptionPaper } from "./VisualDescription.styles";
import { createWeatherIconURL } from "./utils";
import { useEffect } from "react";

const VisualDescription = () => {
  const { descriptionData: data } = useFetchCurrentWeather();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (data && data.weatherDescription) {
      console.log("it speaks");
      speak(data.weatherDescription);
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
