import loadable from "@loadable/component";

import * as ROUTES from "../routes";

import { Routes, Route, useLocation } from "react-router-dom";

import { LandingPage } from "../Pages";
import { useCheckApiKey, useHandleConnectionStatus, usePrepareBackground } from "hooks";
import { breakWhenInternetExplorer } from "js/functions";
import { withProblemMessage } from "HOCs";

const WeatherInformationsPage = loadable(() => import("Pages/WeatherPage"));
const SearchPage = loadable(() => import("Pages/SearchPage"));
const NoPage = loadable(() => import("Pages/NoPage"));

const App = () => {
  useHandleConnectionStatus();
  usePrepareBackground();
  breakWhenInternetExplorer();

  const isAPIKeyAvailable = useCheckApiKey();
  const location = useLocation();

  if (!isAPIKeyAvailable) return null;

  return (
    <main>
      <Routes>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        {location?.state?.results && (
          <Route path={"/" + location.state.results} element={<WeatherInformationsPage />} />
        )}
        <Route path={ROUTES.NOPAGE} element={<NoPage />} />
      </Routes>
    </main>
  );
};
export default withProblemMessage(App);
