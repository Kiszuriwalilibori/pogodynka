import * as React from "react";
import Tabs from "@mui/material/Tabs";

import isEmpty from "lodash/isEmpty";

import { useDelayedCondition, useFavorites, useFetchCurrentWeather, useForceUpdate } from "hooks";
import { usePlaceContext, SpeechContext } from "contexts";
import { WeatherTabsWrapper } from "./WeatherTabs.styles";
import { TabPanel } from "./TabPanel";

import Loader from "components/Loader";
import Current from "./Current";
import Forecast from "./Forecast";
import Comparision from "./Comparision";
import { ReportVariants} from "types";
import TabComponent from "./Tab";

export function WeatherTabs() {
  const [value, setValue] = React.useState(0);
  const { Favorites } = useFavorites();
  const comparisionDisabled = isEmpty(Favorites.getForComparision());
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

  const handleChange = React.useCallback((event: React.SyntheticEvent, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
    cancelSpeech();
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
        <TabComponent index={0} title={ReportVariants.CURRENT}/>
        <TabComponent index={1} title={ReportVariants.FORECAST}/>
        <TabComponent index={2} title={ReportVariants.COMPARISION} disabled={comparisionDisabled} />
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
