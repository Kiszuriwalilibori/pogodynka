import { useCallback, useEffect, useState } from "react";
import { Fade } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { TextAndVoiceWeatherDescriptionPaper } from "./WeatherDescription.styles";
import { createWeatherIconURL, getVoiceCode } from "./WeatherDescription.utils";

const TextAndVoiceWeatherDescription = () => {
  const [isLoadingImageCompleted, setIsLoadingImageCompleted] = useState(false);
  const { descriptionData, speakableWeatherDescription } = useFetchCurrentWeather();
  const { speak, voices } = useSpeechSynthesis();

  const handleLoadingImageCompleted = useCallback(() => {
    setIsLoadingImageCompleted(true);
  }, []);

  useEffect(() => {
    speak({ text: speakableWeatherDescription, voice: voices[getVoiceCode()] });
  }, [speakableWeatherDescription]);

  if (!descriptionData) return null;

  const { icon, weatherDescription } = descriptionData;

  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={isLoadingImageCompleted} timeout={TIMEOUT_LONG}>
      <TextAndVoiceWeatherDescriptionPaper variant="dark" elevation={2}>
        <img
          src={createWeatherIconURL(icon)}
          alt="weather"
          onLoad={handleLoadingImageCompleted}
          onError={handleLoadingImageCompleted}
        ></img>
        {weatherDescription}
      </TextAndVoiceWeatherDescriptionPaper>
    </Fade>
  );
};

export default TextAndVoiceWeatherDescription;
