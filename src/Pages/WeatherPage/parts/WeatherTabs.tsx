import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import isEmpty from "lodash/isEmpty";

import Box from "@mui/material/Box";
import { Comparision, Current, Forecast } from ".";
import { useFavorites } from "hooks";
import { usePlaceContext } from "contexts";
import { useTranslation } from "react-i18next";

const tabSX = {
  "&:focus": {
    outline: "none !important",
    border: "3px solid #ffcf10",
  },
};

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
    <Box sx={{ width: "100%", minHeight: "101vh" }}>
      <Tabs value={value} onChange={handleChange} aria-label="Available reports">
        <Tab sx={tabSX} label={t("tabs.current")} {...a11yProps(0)} tabIndex={0} disableFocusRipple />
        <Tab sx={tabSX} label={t("tabs.forecast")} {...a11yProps(1)} tabIndex={0} disableFocusRipple />
        <Tab
          sx={tabSX}
          label={t("tabs.comparision")}
          {...a11yProps(2)}
          disabled={comparisionDisabled}
          tabIndex={0}
          disableFocusRipple
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
    </Box>
  );
}

export default WeatherTabs;
