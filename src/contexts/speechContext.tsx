import { createContext, useMemo } from "react";
import { useSpeechSynthesis } from "hooks";

interface SpeechContextType {
  cancelSpeech: () => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  error: string | null; // Expose error for debugging or UI feedback
  voices: Voice[]; // Expose voices for manual selection if needed
  setSelectedVoice: (voice: Voice | null) => void; // Allow manual voice override
}

interface Voice {
  name: string;
  lang: string;
  default: boolean;
  localService: boolean;
  voiceURI: string;
}

const SpeechContext = createContext<SpeechContextType>({
  cancelSpeech: () => {},
  speakText: () => {},
  isSpeaking: false,
  error: null,
  voices: [],
  setSelectedVoice: () => {},
});

const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const { stop, speak, isSpeaking, error, voices, setSelectedVoice } = useSpeechSynthesis();

  const speakText = (text: string) => speak(text);

  const cancelSpeech = () => stop();

  const contextValue = useMemo(
    () => ({
      cancelSpeech,
      speakText,
      isSpeaking,
      error,
      voices,
      setSelectedVoice,
    }),
    [isSpeaking, error, voices, setSelectedVoice]
  );

  return <SpeechContext.Provider value={contextValue}>{children}</SpeechContext.Provider>;
};

export { SpeechProvider, SpeechContext };

//* TODO ogarnąć błędy ewentualne
