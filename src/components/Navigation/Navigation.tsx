import { IconButton, Theme, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
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

import ResetButton from "./ResetButton";
import { RootStateType } from "types";

import NavigationLeftBoxItemRenderer from "./NavigationLeftBoxItemRenderer";
import Place from "./Place";

const Navigation = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const hasFavorites = useSelector((state: RootStateType) => state.hasFavorites);
  const location = useLocation();
  const { cancelSpeech } = useContext(SpeechContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { redirectURL } = { ...usePlaceContext().place };
  const isDisabled =!redirectURL
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const isActive = useCallback((path: string) => {  
    const currentPath = '/' + location.pathname.split('/').filter(Boolean)[0];
    return currentPath === path;
  }, [location.pathname]);

const handleClick =useCallback((path:string,isMobile:boolean)=>{
  cancelSpeech?.();
  navigate(path,{state: location.state});
 if(isMobile){
 setMobileMenuOpen(false);}
},[cancelSpeech,navigate,location.state]);


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
              <ResetButton disabled={isDisabled} />
              <NavigationButton

                isActive={isActive(ROUTES.LANDING)}
                onClick={()=>handleClick(ROUTES.LANDING,false)}
                language={i18n.language}
              >
                {t("navigation.home")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.SEARCH)}
                onClick={()=>handleClick(ROUTES.SEARCH,false)}
                language={i18n.language}
              >
                {t("navigation.search")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.WEATHER)}
                disabled={isDisabled}
                onClick={()=>handleClick(ROUTES.WEATHER+redirectURL,false)}
                
                language={i18n.language}
              >
                {t("navigation.weather_page")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.FORECAST)}
                disabled={isDisabled}
                onClick={()=>handleClick(ROUTES.FORECAST+redirectURL,false)}
                
                language={i18n.language}
              >
                {t("navigation.forecast")}
              </NavigationButton>
              <NavigationButton
                isActive={isActive(ROUTES.COMPARISON)}
                disabled={isDisabled || !hasFavorites}
                onClick={()=>handleClick(ROUTES.COMPARISON+redirectURL,false)}
                
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
              onClick={()=>handleClick(ROUTES.LANDING,true)}
              
              language={i18n.language}
            >
              {t("navigation.home")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.SEARCH)}
              onClick={()=>handleClick(ROUTES.SEARCH,true)}
              
              language={i18n.language}
            >
              {t("navigation.search")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.WEATHER)}
              disabled={isDisabled}
              onClick={()=>handleClick(ROUTES.WEATHER+redirectURL,true)}
              
              language={i18n.language}
            >
              {t("navigation.weather_page")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.FORECAST)}
              disabled={isDisabled}
              onClick={()=>handleClick(ROUTES.FORECAST+redirectURL,true)}
              
              language={i18n.language}
            >
              {t("navigation.forecast")}
            </NavigationButton>
            <NavigationButton
              isActive={isActive(ROUTES.COMPARISON)}
              disabled={isDisabled || !hasFavorites}
              onClick={()=>handleClick(ROUTES.COMPARISON+redirectURL,true)}
              
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
