import { useCallback, useEffect, useState } from "react";
import { Fade } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useSpeechSynthesis } from "react-speech-kit";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { MuteButton, TextAndVoiceWeatherDescriptionPaper } from "./WeatherDescription.styles";
import { createWeatherIconURL, getVoiceCode } from "./WeatherDescription.utils";

const TextAndVoiceWeatherDescription = () => {
  const [isLoadingImageCompleted, setIsLoadingImageCompleted] = useState(false);
  const { descriptionData, speakableWeatherDescription } = useFetchCurrentWeather();
  const { cancel, speak, speaking, voices } = useSpeechSynthesis();

  const handleLoadingImageCompleted = useCallback(() => {
    setIsLoadingImageCompleted(true);
  }, []);

  useEffect(() => {
    speakableWeatherDescription && speak({ text: speakableWeatherDescription, voice: voices[getVoiceCode()] });
  }, [speakableWeatherDescription]);

  if (!descriptionData) return null;

  const { icon, weatherDescription } = descriptionData;

  return (
    <>
      <Fade in={isLoadingImageCompleted} timeout={TIMEOUT_LONG} id="Fade">
        <TextAndVoiceWeatherDescriptionPaper variant="dark" elevation={2} id="TextAndVoiceWeatherDescriptionPaper">
          <img
            src={createWeatherIconURL(icon)}
            alt="weather"
            onLoad={handleLoadingImageCompleted}
            onError={handleLoadingImageCompleted}
          ></img>
          {weatherDescription}
        </TextAndVoiceWeatherDescriptionPaper>
      </Fade>
      {speaking && (
        <Fade timeout={TIMEOUT_LONG} in={speaking}>
          <MuteButton onClick={cancel} id="MuteButton">
            <VolumeOffIcon />
          </MuteButton>
        </Fade>
      )}
    </>
  );
};

export default TextAndVoiceWeatherDescription;
