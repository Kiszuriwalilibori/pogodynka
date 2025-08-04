import { getVoiceCode } from "Pages/WeatherPage/parts/WeatherDescription/WeatherDescription.utils";
import { createContext, useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const SpeechContext = createContext({ cancelSpeech: () => {}, speakText: (text: string) => {}, isSpeaking: false });

const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const { cancel, speak, speaking, voices } = useSpeechSynthesis();
  const [isSpeaking, setIsSpeaking] = useState(speaking);

  useEffect(() => {
    setIsSpeaking(speaking);
  }, [speaking]);

  const cancelSpeech = () => {
    cancel();
  };

  const speakText = (text: string) => {
    speak({ text, voice: voices[getVoiceCode()] });
  };

  return <SpeechContext.Provider value={{ cancelSpeech, speakText, isSpeaking }}>{children}</SpeechContext.Provider>;
};

export { SpeechProvider, SpeechContext };
