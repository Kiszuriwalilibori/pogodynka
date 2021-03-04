import React, { useState, lazy } from "react";

import LandingPage from "./LandingPage";
import Awaiting from './details/Awaiting';
import SearchSection from "./SearchSection";
import * as ROUTES from "../js/routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const CollectedWeatherInfos = lazy(()=>import('./CollectedWeatherInformations/CollectedWeatherInfos'));
const ErrorMessage = lazy(()=>import('./ErrorMessage'));


const App = () => {
  const [path, setPath] = useState("/city");
  const getPath = (value) => {
    setPath(value);
  }; /*defines callback that will modify Route so it leads to given city*/

  return (
   
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path={ROUTES.LANDING}>
          <LandingPage />
        </Route>
        <Route path={ROUTES.SEARCH}>
          <SearchSection getPath={getPath} />
        </Route>
        <Route path = {path} component ={Awaiting(CollectedWeatherInfos)} />
        <Route path={ROUTES.ERROR} component ={Awaiting(ErrorMessage)} />
      </Switch>
    </Router>
  );
};
export default App;

