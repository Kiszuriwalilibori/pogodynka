import React from "react";
import { WeatherInfos_Place, WeatherInfos_Time } from "../details/details";
import { getCurrentTime, getLabelfromPath } from "../../js/functions";
import { useLocation } from "react-router-dom";

import * as ROUTES from'../../js/routes';
import {
  Link,
} from "react-router-dom";

const Header = props => {
  let locationObj = useLocation();
  const location = getLabelfromPath(locationObj.pathname);
  return location ? (
    <header className ="weatherinfos__header">
      <WeatherInfos_Place place ={location} />
      <Link className ="weatherinfos__link" to= {ROUTES.SEARCH} ><span>Powrót do szukania</span></Link>
      <WeatherInfos_Time time={getCurrentTime()} />
    </header>
  ) : null;
};

export default Header;
