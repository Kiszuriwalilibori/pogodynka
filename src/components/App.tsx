import { Routes, Route} from "react-router-dom";
import { Box } from "@mui/material";

import * as ROUTES from "routes";
import { LandingPage, SearchPage, NoPage, WeatherPage } from "../Pages";
import Layout from "./Layout/Layout";

import { useCheckApiKey, useHandleConnectionStatus, usePrepareBackground } from "hooks";
import { breakWhenInternetExplorer } from "js/functions";
import { withProblemMessage } from "HOCs";
import { ForecastPage } from "Pages/ForecastPage";

const App = () => {
  useHandleConnectionStatus();
  usePrepareBackground();
  breakWhenInternetExplorer();

  const isAPIKeyAvailable = useCheckApiKey();
  if (!isAPIKeyAvailable) return null;

  return (
    <Box>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.WEATHER +"/:place"} element={<WeatherPage />}/>
          <Route path={ROUTES.FORECAST +"/:place"} element={<ForecastPage />}/>            
          <Route path={ROUTES.NOPAGE} element={<NoPage />} />
        </Route>
      </Routes>
    </Box>
  );
};
export default withProblemMessage(App);
