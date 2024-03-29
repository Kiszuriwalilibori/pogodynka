import moment from "moment";
import "moment/locale/pl";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Switch from "./switch";

import { LanguageSwitchStack } from "./LanguageSwitch.styles";

export default function LanguageSwitch() {
  const [language, setLanguage] = useState("pl");
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    () => {
      if (language === "en") {
        setLanguage("pl");
        moment.locale("pl");
        i18n.changeLanguage("pl");
      } else {
        setLanguage("en");
        moment.locale("en");
        i18n.changeLanguage("en");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  return (
    <LanguageSwitchStack onClick={e => e.stopPropagation()} direction="row" spacing={2}>
      <img alt="country flag" src={require("images/pl.png")} />
      <Switch onChangeHandler={changeLanguage} optionClassName="option option--desktop-visible" />
      <img alt="country flag" src={require("images/gb.png")} />
    </LanguageSwitchStack>
  );
}
