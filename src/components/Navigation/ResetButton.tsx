import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaceContext } from "contexts/placeContext";

import * as ROUTES from "routes";
import { NavigationButton } from "./Navigation.styles";
import { PlaceType } from "types";

interface ResetButtonProps {
  disabled?: boolean;
}

export const ResetButton = ({ disabled = false }: ResetButtonProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
    const { setPlace } = usePlaceContext();
  
    const handleClick = useCallback(() => {
      setPlace({} as PlaceType);
      navigate(ROUTES.SEARCH);
    }, [navigate, setPlace]);
  
  
  return (
    <NavigationButton language={i18n.language} onClick={handleClick} disabled={disabled}>
      {t('navigation.reset')}
    </NavigationButton>
  );
};

export default ResetButton;
