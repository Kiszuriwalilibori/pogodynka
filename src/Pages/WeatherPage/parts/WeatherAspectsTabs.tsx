import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import isEmpty from "lodash/isEmpty";

import Box from "@mui/material/Box";
import { WeatherComparision, WeatherCurrent, WeatherForecast } from ".";
import { ReportVariants } from "types";
import { useFavorites } from "hooks";
import { usePlaceContext } from "contexts";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function WeatherAspectsTabs() {
  const [value, setValue] = React.useState(0);
  const { Favorites } = useFavorites();
  const comparisionDisabled = isEmpty(Favorites.getForComparision());
  const [, updateState] = React.useState();

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
    <Box sx={{ width: "100%", minHeight: "101vh" }}>
      <Tabs value={value} onChange={handleChange} aria-label="weather-informations-list-of-available-reports">
        <Tab label={ReportVariants.CURRENT} {...a11yProps(0)} />
        <Tab label={ReportVariants.FORECAST} {...a11yProps(1)} />
        <Tab label={ReportVariants.COMPARISION} {...a11yProps(2)} disabled={comparisionDisabled} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <WeatherCurrent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeatherForecast />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WeatherComparision />
      </TabPanel>
    </Box>
  );
}

export default WeatherAspectsTabs;
