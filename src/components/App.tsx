import * as ROUTES from "../routes";

import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { LandingPage } from "../Pages";

import { useCheckApiKey, useHandleConnectionStatus, usePrepareBackground } from "hooks";
import { breakWhenInternetExplorer } from "js/functions";
import { withProblemMessage } from "HOCs";




import {  ComparisonPage, ForecastPage,SearchPage,NoPage, WeatherPage} from "../Pages";

import Navigation from "./Navigation/Navigation";

const App = () => {
  useHandleConnectionStatus();
  usePrepareBackground();
  breakWhenInternetExplorer();

  const isAPIKeyAvailable = useCheckApiKey();
  const location = useLocation();

  if (!isAPIKeyAvailable) return null;

  return (
    <Box>
      <Navigation />
      <main role="main" aria-label="Weather Application">
        <Routes>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          {location?.state?.results && (
            <Route path={"/" + location.state.results} element={<WeatherPage />} />
          )}
          {/* <Route path={ROUTES.WEATHER} element={<WeatherPage />} /> */}
          <Route path={ROUTES.FORECAST} element={<ForecastPage />} />
          <Route path={ROUTES.COMPARISON} element={<ComparisonPage />} />
          <Route path={ROUTES.NOPAGE} element={<NoPage />} />
        </Routes>
      </main>
    </Box>
  );
};
export default withProblemMessage(App);

// TODO: guzik przenosi do weatherPage bo jest tak zahardcodowany wersja zakomentowana by działała
