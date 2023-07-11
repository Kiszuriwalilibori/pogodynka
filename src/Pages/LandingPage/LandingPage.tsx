import { wrappedInLinkToSearch } from "HOCs";
import { useTranslation } from "react-i18next";
import "./_LandingPage.scss";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <section className="LandingPage">
      <h1>{t("landing.welcome")}</h1>
      <h2>{t("landing.click")}</h2>
    </section>
  );
};

export default wrappedInLinkToSearch(LandingPage);
