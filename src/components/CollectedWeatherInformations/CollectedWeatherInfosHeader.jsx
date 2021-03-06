import React from "react";
import { ContentHeaderWrapper, ContentHeaderCity, WeatherNowHeader } from "../details/details";
import { getCurrentTime, getLabelfromPath } from "../../js/functions";
import { useLocation } from "react-router-dom";

const Header = props => {
  let locationObj = useLocation();
  const location = getLabelfromPath(locationObj.pathname);
  return location ? (
    <ContentHeaderWrapper>
      <ContentHeaderCity>{location}</ContentHeaderCity>
      <WeatherNowHeader time={getCurrentTime()} />
    </ContentHeaderWrapper>
  ) : null;
};

export default Header;
