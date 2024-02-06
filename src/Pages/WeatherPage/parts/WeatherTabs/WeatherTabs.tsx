import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import isEmpty from "lodash/isEmpty";

import { useTranslation } from "react-i18next";

import { Comparision, Current, Forecast } from "..";
import { useFavorites } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherTabsWrapper, tabSX } from "./WeatherTabs.styles";
import { TabPanel } from "./TabPanel";
import { a11yProps } from "./utils";

const TAB = "Tab ";

export function WeatherTabs() {
  const [value, setValue] = React.useState(0);
  const { Favorites } = useFavorites();
  const comparisionDisabled = isEmpty(Favorites.getForComparision());
  const [, updateState] = React.useState();
  const { t } = useTranslation();

  const forceUpdate = React.useCallback(() => updateState({} as React.SetStateAction<undefined>), []);
  window &&
    window.addEventListener("storage", () => {
      forceUpdate();
    });

  const handleChange = (event: React.SyntheticEvent, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };
  const placeContext = usePlaceContext();
  if (isEmpty(placeContext.place)) return null;

  return (
    <WeatherTabsWrapper>
      <Tabs value={value} onChange={handleChange} aria-label="Available reports">
        <Tab
          sx={tabSX}
          label={t("tabs.current")}
          {...a11yProps(0)}
          tabIndex={0}
          disableFocusRipple
          id={TAB + t("tabs.current")}
        />
        <Tab
          sx={tabSX}
          label={t("tabs.forecast")}
          {...a11yProps(1)}
          tabIndex={0}
          disableFocusRipple
          id={TAB + t("tabs.current")}
        />
        <Tab
          sx={tabSX}
          label={t("tabs.comparision")}
          {...a11yProps(2)}
          disabled={comparisionDisabled}
          tabIndex={0}
          disableFocusRipple
          id={TAB + t("tabs.current")}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Current />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Forecast />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Comparision />
      </TabPanel>
    </WeatherTabsWrapper>
  );
}

export default WeatherTabs;
