import * as React from "react";
import Tabs from "@mui/material/Tabs";

import isEmpty from "lodash/isEmpty";

import { useDelayedCondition, useFavorites, useFetchCurrentWeather, useForceUpdate } from "hooks";
import { usePlaceContext, SpeechContext } from "contexts";
import { ReportVariants } from "types";

import Loader from "components/Loader";
import Current from "./Current";
import Forecast from "./Forecast";
import Comparision from "./Comparision";
import { TabComponent as Tab } from "./Tab";
import { WeatherTabsWrapper } from "./WeatherTabs.styles";
import { TabPanel } from "./TabPanel";

export const WeatherTabs = () => {
  const [value, setValue] = React.useState(0);
  const { Favorites } = useFavorites();
  const isComparisionDisabled = isEmpty(Favorites.getForComparision());
  const forceUpdate = useForceUpdate();
  const { cancelSpeech } = React.useContext(SpeechContext);
  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isCurrentWeatherLoading);

  React.useEffect(() => {
    const handleStorage = () => {
      forceUpdate();
    };

    if (window) {
      window.addEventListener("storage", handleStorage);
    }

    return () => {
      if (window) {
        window.removeEventListener("storage", handleStorage);
      }
    };
  }, [forceUpdate]);

  const placeContext = usePlaceContext();

  const { labelCurrent } = { ...usePlaceContext().place };

  if (isEmpty(placeContext.place)) return null;
  if (isLoading) {
    return <Loader />;
  }
  if (!currentWeatherData) return null;

  const handleTabClick = (event: React.MouseEvent, index: number) => {
    setValue(index);
    cancelSpeech();
  };

  return (
    <WeatherTabsWrapper>
      <Tabs value={value} aria-label="Available reports">
        <Tab index={0} title={ReportVariants.CURRENT} onClick={handleTabClick} />
        <Tab index={1} title={ReportVariants.FORECAST} onClick={handleTabClick} />
        <Tab index={2} title={ReportVariants.COMPARISION} onClick={handleTabClick} disabled={isComparisionDisabled} />
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
};

export default WeatherTabs;
