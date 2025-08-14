import * as React from "react";
import isEmpty from "lodash/isEmpty";

import { useDelayedCondition,useFetchCurrentWeather, useForceUpdate } from "hooks";
import { usePlaceContext} from "contexts";
import {Loader} from "components";
import Current from "./Current";
import Forecast from "./Forecast";
import Comparision from "./Comparision";

import { TabPanel } from "./TabPanel";
import { useSelectedTab} from "js/Redux/reducer";

export const WeatherTabs = () => {
  const value = useSelectedTab();
  
  const forceUpdate = useForceUpdate();
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

  if (isEmpty(placeContext.place)) return null;
  if (isLoading) {
    return <Loader />;
  }
  if (!currentWeatherData) return null;

  return (
    <>
      <TabPanel value={value} index={1}>
        <Current currentWeatherData={currentWeatherData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Forecast />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Comparision />
      </TabPanel>
    </>
  );
};

export default WeatherTabs;



// 