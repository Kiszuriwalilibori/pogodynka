import { IconButton, Theme, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import * as ROUTES from "routes";

import { SpeechContext, usePlaceContext } from "contexts";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import {
  NavigationPaper,
  NavigationToolbar,
  NavigationButton,
  NavigationLeftBox,
  NavigationRightBox,
  NavigationLeftBoxItem,
  MobileMenuBox,
  mobileHidden,
  HamburgerContainer,
  LargeToolbar,
  tabletVisible,
} from "./Navigation.styles";

import Time from "./Time";
import { useSetSelectedTab } from "js/Redux/reducer";
import ResetButton from "./ResetButton";
import { RootStateType } from "types";

import NavigationLeftBoxItemRenderer from "./NavigationLeftBoxItemRenderer";
import Place from "./Place";

const Navigation = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const hasFavorites = useSelector((state: RootStateType) => state.hasFavorites);
  const setSelectedTab = useSetSelectedTab();
  const location = useLocation();
  const { cancelSpeech } = useContext(SpeechContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDisabled = !location.state?.results;
  const { redirectURL } = { ...usePlaceContext().place };
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavigationPaper>
      <LargeToolbar component="nav" role="navigation" aria-label="weather navigation">
        <NavigationLeftBox role="region" aria-label="navigation controls">
          <NavigationLeftBoxItem variant="h6" component="span" role="heading" aria-level={1} sx={mobileHidden}>
            {t("navigation.weather")}
          </NavigationLeftBoxItem>
          <Place renderer = {NavigationLeftBoxItemRenderer}/>
          <Time renderer = {NavigationLeftBoxItemRenderer}/>
        </NavigationLeftBox>
        <HamburgerContainer>
          <IconButton
            sx={tabletVisible}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="open menu"
            color="inherit"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </HamburgerContainer>
        {isTablet ? null : (
          <NavigationRightBox>
            <NavigationToolbar>
              <ResetButton disabled={!location.state?.results} />
              <NavigationButton
                isActive={isActive(ROUTES.LANDING)}
                onClick={() => {
                  cancelSpeech?.();
                  navigate(ROUTES.LANDING,{state: location.state});
                }}
                language={i18n.language}
              >
                {t("navigation.home")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.SEARCH)}
                onClick={() => {
                  cancelSpeech?.();
                  navigate(ROUTES.SEARCH,{state: location.state});
                }}
                language={i18n.language}
              >
                {t("navigation.search")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.WEATHER)}
                disabled={isDisabled}
                onClick={() => {
                  cancelSpeech?.();
                  navigate(ROUTES.WEATHER+redirectURL,{state: location.state});
                  setSelectedTab(1);
                }}
                language={i18n.language}
              >
                {t("navigation.weather_page")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.WEATHER)}
                disabled={isDisabled}
                onClick={() => {
                  cancelSpeech?.();
                  navigate(ROUTES.FORECAST+redirectURL, {state: location.state});
                }}
                language={i18n.language}
              >
                {t("navigation.forecast")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.WEATHER)}
                disabled={isDisabled || !hasFavorites}
                onClick={() => {
                  cancelSpeech?.();
                  navigate(ROUTES.WEATHER+redirectURL,{state: location.state});
                  setSelectedTab(3);
                }}
                language={i18n.language}
              >
                {t("navigation.comparison")}
              </NavigationButton>
            </NavigationToolbar>
          </NavigationRightBox>
        )}
      </LargeToolbar>
      {isTablet && mobileMenuOpen && (
        <MobileMenuBox id="mobile-menu-box">
          <NavigationToolbar>
            <ResetButton />

            <NavigationButton
              isActive={isActive(ROUTES.LANDING)}
              onClick={() => {
                cancelSpeech?.();
                navigate(ROUTES.LANDING,{state: location.state});
                setMobileMenuOpen(false);
              }}
              language={i18n.language}
            >
              {t("navigation.home")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.SEARCH)}
              onClick={() => {
                cancelSpeech?.();
                navigate(ROUTES.SEARCH,{state: location.state});
                setMobileMenuOpen(false);
              }}
              language={i18n.language}
            >
              {t("navigation.search")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.WEATHER)}
              disabled={isDisabled}
              onClick={() => {
                cancelSpeech?.();
                navigate(ROUTES.WEATHER+redirectURL,{state: location.state});
                setSelectedTab(1);
                setMobileMenuOpen(false);
              }}
              language={i18n.language}
            >
              {t("navigation.weather_page")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.WEATHER)}
              disabled={isDisabled}
              onClick={() => {
                cancelSpeech?.();
                navigate(ROUTES.FORECAST+redirectURL,{state: location.state});
                setMobileMenuOpen(false);
              }}
              language={i18n.language}
            >
              {t("navigation.forecast")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.WEATHER)}
              disabled={isDisabled || !hasFavorites}
              onClick={() => {
                cancelSpeech?.();
                navigate(ROUTES.WEATHER+redirectURL,{state: location.state});
                setSelectedTab(3);
                setMobileMenuOpen(false);
              }}
              language={i18n.language}
            >
              {t("navigation.comparison")}
            </NavigationButton>
          </NavigationToolbar>
        </MobileMenuBox>
      )}
    </NavigationPaper>
  );
};

export default Navigation;
