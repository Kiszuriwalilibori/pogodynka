import { Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import * as ROUTES from "routes";
import { useFavorites } from "hooks";
import { useTranslation } from "react-i18next";

import {
  NavigationPaper,
  NavigationToolbar,
  NavigationButton,
  NavigationLeftBox,
  NavigationRightBox,
  NavigationLeftBoxItem,
  
} from "./Navigation.styles";
import Place from "./Place";
import Time from "./Time";


const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Favorites } = useFavorites();
  const { t, i18n } = useTranslation();
  

  // Don't render navigation on landing page
  if (location.pathname === ROUTES.LANDING) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavigationPaper>
      <Toolbar component="nav" role="navigation" aria-label="weather navigation" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <NavigationLeftBox role="region" aria-label="navigation controls">
          <NavigationLeftBoxItem variant="h6" component="span" role="heading" aria-level={1}>
            {t("navigation.weather")}
          </NavigationLeftBoxItem>
          <Place />
          <Time />
        </NavigationLeftBox>
        <NavigationRightBox>
          <NavigationToolbar>
            <NavigationButton isActive={isActive(ROUTES.LANDING)} onClick={() => navigate(ROUTES.LANDING)} language={i18n.language}>
              {t('navigation.home')}
            </NavigationButton>
            <NavigationButton isActive={isActive(ROUTES.SEARCH)} onClick={() => navigate(ROUTES.SEARCH)} language={i18n.language}>
              {t('navigation.search')}
            </NavigationButton>
            <NavigationButton isActive={isActive(ROUTES.WEATHER)} onClick={() => navigate(ROUTES.WEATHER)} language={i18n.language}>
              {t('navigation.weather_page')}
            </NavigationButton>
            <NavigationButton isActive={isActive(ROUTES.FORECAST)} onClick={() => navigate(ROUTES.FORECAST)} language={i18n.language}>
              {t('navigation.forecast')}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.COMPARISON)}
              disabled={Favorites.getLength() === 0}
              onClick={() => navigate(ROUTES.COMPARISON)}
              language={i18n.language}
            >
              {t('navigation.comparison')}
            </NavigationButton>
          </NavigationToolbar>
        </NavigationRightBox>
      </Toolbar>
    </NavigationPaper>
  );
};

export default Navigation;
