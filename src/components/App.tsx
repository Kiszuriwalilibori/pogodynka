import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import * as ROUTES from "../routes";
import { LandingPage, SearchPage, NoPage, WeatherPage } from "../Pages";
import Layout from "./Layout/Layout";

import { useCheckApiKey, useHandleConnectionStatus, usePrepareBackground } from "hooks";
import { breakWhenInternetExplorer } from "js/functions";
import { withProblemMessage } from "HOCs";

const App = () => {
  useHandleConnectionStatus();
  usePrepareBackground();
  breakWhenInternetExplorer();

  const isAPIKeyAvailable = useCheckApiKey();
  const location = useLocation();

  if (!isAPIKeyAvailable) return null;

  return (
    <Box>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          {location?.state?.results && (
            <Route path={"/" + location.state.results} element={<WeatherPage />} />
          )}  
          <Route path={ROUTES.WEATHER +"/:place"}element={<WeatherPage />}/>      
          <Route path={ROUTES.NOPAGE} element={<NoPage />} />
        </Route>
      </Routes>
    </Box>
  );
};
export default withProblemMessage(App);
