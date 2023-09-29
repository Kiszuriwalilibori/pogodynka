import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import * as ROUTES from "../../routes";

import "./_LandingPage.scss";
import LanguageSwitch from "./LanguageSwitch";

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(ROUTES.SEARCH);
  }, [navigate]);
  return (
    <section className="LandingPage" onClick={handleClick}>
      <h1>{t("landing.welcome")}</h1>
      <h2>{t("landing.click")}</h2>
      <LanguageSwitch />
    </section>
  );
};

export default LandingPage;
