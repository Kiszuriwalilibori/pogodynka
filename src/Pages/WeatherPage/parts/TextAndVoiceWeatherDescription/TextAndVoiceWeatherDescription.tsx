import { Fade } from "@mui/material";
import { useSpeechSynthesis } from "react-speech-kit";

import { useFetchCurrentWeather } from "hooks";
import { TIMEOUT_LONG } from "fixtures";
import { TextAndVoiceWeatherDescriptionPaper } from "./TextAndVoiceWeatherDescription.styles";
import { createWeatherIconURL, getVoiceCode } from "./utils";
import { useEffect } from "react";

const TextAndVoiceWeatherDescription = () => {
  const { descriptionData, voiceDescriptionText } = useFetchCurrentWeather();
  const { speak, voices } = useSpeechSynthesis();

  useEffect(() => {
    speak({ text: voiceDescriptionText, voice: voices[getVoiceCode()] });
  }, [voiceDescriptionText]);

  if (!descriptionData) return null;

  const { icon, weatherDescription } = descriptionData;

  if (!weatherDescription || !icon) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_LONG}>
      <TextAndVoiceWeatherDescriptionPaper variant="dark" elevation={2}>
        <img src={createWeatherIconURL(icon)} alt="weather"></img>
        {weatherDescription}
      </TextAndVoiceWeatherDescriptionPaper>
    </Fade>
  );
};

export default TextAndVoiceWeatherDescription;
