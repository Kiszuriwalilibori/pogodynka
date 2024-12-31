import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import isEmpty from "lodash/isEmpty";

import { useTranslation } from "react-i18next";

import { Comparision, Current, Forecast } from "..";
import { useDelayedCondition, useFavorites, useFetchCurrentWeather, useForceUpdate } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherTabsWrapper, tabSX } from "./WeatherTabs.styles";
import { TabPanel } from "./TabPanel";
import { a11yProps } from "./utils";
import Loader from "components/Loader";

const TAB = "Tab ";

export function WeatherTabs() {
  const [value, setValue] = React.useState(0);
  const { Favorites } = useFavorites();
  const comparisionDisabled = isEmpty(Favorites.getForComparision());
  const forceUpdate = useForceUpdate();

  const { t } = useTranslation();

  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isCurrentWeatherLoading);

  window &&
    window.addEventListener("storage", () => {
      forceUpdate();
    });

  const handleChange = React.useCallback((event: React.SyntheticEvent, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  }, []);

  const placeContext = usePlaceContext();

  const { labelCurrent } = { ...usePlaceContext().place };

  if (isEmpty(placeContext.place)) return null;
  if (isLoading) {
    return <Loader />;
  }
  if (!currentWeatherData) return null;

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
        <Current currentWeatherData={currentWeatherData} labelCurrent={labelCurrent} />
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
