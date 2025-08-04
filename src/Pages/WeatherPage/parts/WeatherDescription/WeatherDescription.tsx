import { useCallback, useContext, useEffect, useState } from "react";
import { Fade } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { MuteButton, TextAndVoiceWeatherDescriptionPaper } from "./WeatherDescription.styles";
import { createWeatherIconURL } from "./WeatherDescription.utils";
import { SpeechContext } from "contexts/index";

const TextAndVoiceWeatherDescription = () => {
  const [isLoadingImageCompleted, setIsLoadingImageCompleted] = useState(false);
  const { descriptionData, speakableWeatherDescription } = useFetchCurrentWeather();

  const { speakText, isSpeaking, cancelSpeech } = useContext(SpeechContext);
  const handleLoadingImageCompleted = useCallback(() => {
    setIsLoadingImageCompleted(true);
  }, []);

  useEffect(() => {
    speakableWeatherDescription && speakText(speakableWeatherDescription);
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
      {isSpeaking && (
        <Fade timeout={TIMEOUT_LONG} in={isSpeaking}>
          <MuteButton onClick={cancelSpeech} id="MuteButton">
            <VolumeOffIcon />
          </MuteButton>
        </Fade>
      )}
    </>
  );
};

export default TextAndVoiceWeatherDescription;
