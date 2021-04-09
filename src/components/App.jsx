import React, {lazy} from "react";

import LandingPage from "./LandingPage";
import Awaiting from './details/Awaiting';
import SearchSection from "./SearchSection";
import * as ROUTES from "../js/routes";
import { Switch, Route, useLocation, } from "react-router-dom";
const CollectedWeatherInfos = lazy(()=>import('./CollectedWeatherInformations/CollectedWeatherInfos'));

const App = () => {
  
  const location = useLocation();
  return (
      <Switch>
        <Route exact path={ROUTES.LANDING}>
          <LandingPage />
        </Route>
        <Route path={ROUTES.SEARCH}>
          <SearchSection />
        </Route>
        <Route path = {location.pathname} component ={Awaiting(CollectedWeatherInfos)} />
        
      </Switch>
  );
};
export default App;

