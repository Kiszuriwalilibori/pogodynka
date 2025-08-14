import { useState, useEffect, useCallback } from "react";
import i18n from "i18next"; // Import i18next

// Define types for the hook
interface Voice {
  name: string;
  lang: string;
  default: boolean;
  localService: boolean;
  voiceURI: string;
}

interface SpeechSynthesisHook {
  voices: Voice[];
  selectedVoice: Voice | null;
  isSpeaking: boolean;
  error: string | null;
  speak: (text: string, pitch?: number, rate?: number, volume?: number) => void;
  stop: () => void;
  setSelectedVoice: (voice: Voice | null) => void;
}

const useSpeechSynthesis = (): SpeechSynthesisHook => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load voices and handle cases where no voices are available
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length === 0) {
        setError("No speech synthesis voices available in this browser");
        setSelectedVoice(null);
        return;
      }

      // Get current language from i18next (fallback to "en")
      const currentLang = i18n.language || (i18n.options.fallbackLng as string) || "en";

      // Find a voice matching the current language (case-insensitive, partial match)
      const matchingVoice =
        availableVoices.find(voice => voice.lang.toLowerCase().startsWith(currentLang.toLowerCase())) ||
        availableVoices.find(voice => voice.default);

      if (matchingVoice) {
        setSelectedVoice(matchingVoice);
      } else {
        setError(`No voice found for language "${currentLang}"`);
        setSelectedVoice(null);
      }
    };

    // Load voices initially and when they change
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Listen for i18next language changes
    const handleLanguageChange = () => loadVoices();
    i18n.on("languageChanged", handleLanguageChange);

    // Cleanup
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // Speak function
  const speak = useCallback(
    (text: string, pitch: number = 1, rate: number = 1, volume: number = 1) => {
      if (!window.speechSynthesis) {
        setError("Speech Synthesis not supported in this browser");
        return;
      }

      if (voices.length === 0) {
        setError("No speech synthesis voices available");
        return;
      }

      if (text.trim() === "") {
        setError("No text provided");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Set language from i18next
      const currentLang = i18n.language || (i18n.options.fallbackLng as string) || "en";
      utterance.lang = currentLang;

      // Use selected voice or fallback to a matching voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        const matchingVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(currentLang.toLowerCase()));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        } else {
          setError(`No voice available for language "${currentLang}"`);
          return;
        }
      }

      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;

      // Handle speech events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = event => {
        setIsSpeaking(false);
        setError(`Speech error: ${event.error}`);
      };

      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, voices]
  );

  // Stop speech
  const stop = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSpeaking]);

  return {
    voices,
    selectedVoice,
    isSpeaking,
    error,
    speak,
    stop,
    setSelectedVoice,
  };
};

export default useSpeechSynthesis;
