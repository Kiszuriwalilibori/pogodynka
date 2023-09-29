import moment from "moment";
import "moment/locale/pl";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Switch from "./switch";
import Stack from "@mui/material/Stack";

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
    <Stack
      onClick={e => e.stopPropagation()}
      direction="row"
      spacing={2}
      sx={{ margin: "0 auto", width: "150px", alignItems: "center" }}
    >
      <img className="country-image switch-image" alt="text" src="https://flagcdn.com/28x21/pl.png" />
      <Switch onChangeHandler={changeLanguage} optionClassName="option option--desktop-visible" />
      <img className="country-image switch-image" alt="text" src="https://flagcdn.com/28x21/gb.png" />
    </Stack>
  );
}
