import { useTranslation } from "react-i18next";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaceContext } from "contexts/placeContext";

import * as ROUTES from "routes";
import { NavigationButton } from "./Navigation.styles";
import { PlaceType } from "types";
import { SpeechContext } from "contexts/speechContext";

interface ResetButtonProps {
  disabled?: boolean;
}

export const ResetButton = ({ disabled = false }: ResetButtonProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cancelSpeech } = useContext(SpeechContext);
  
    const { setPlace } = usePlaceContext();
  
    const handleClick = useCallback(() => {
      setPlace({} as PlaceType);
      cancelSpeech?.();
      navigate(ROUTES.SEARCH);
    }, [navigate, setPlace,cancelSpeech]);
  
  
  return (
    <NavigationButton language={i18n.language} onClick={handleClick} disabled={disabled}>
      {t('navigation.reset')}
    </NavigationButton>
  );
};

export default ResetButton;
