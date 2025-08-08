

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Switch from "./switch";

import { LanguageSwitchStack } from "./LanguageSwitch.styles";

const LanguageSwitch = () => {
  const [language, setLanguage] = useState("pl");
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    () => {
      if (language === "en") {
        setLanguage("pl");

        i18n.changeLanguage("pl");
      } else {
        setLanguage("en");

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
};

export default LanguageSwitch;
