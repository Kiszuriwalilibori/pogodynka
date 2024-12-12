import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import * as ROUTES from "../../routes";

import "./_LandingPage.scss";
import LanguageSwitch from "./LanguageSwitch";
import { useIsBackgroundReady } from "js/Redux/reducer";
import Fade from "@mui/material/Fade";

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isBackgroundReady = useIsBackgroundReady();

  const handleClick = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);
  if (!isBackgroundReady) {
    return (
      <Fade in={true} timeout={300}>
        <div className="loader" />
      </Fade>
    );
  }
  return (
    <Fade in={true} timeout={700}>
      <section className="LandingPage" onClick={handleClick}>
        <h1>{t("landing.welcome")}</h1>
        <h2>{t("landing.click")}</h2>
        <LanguageSwitch />
      </section>
    </Fade>
  );
};

export default LandingPage;
