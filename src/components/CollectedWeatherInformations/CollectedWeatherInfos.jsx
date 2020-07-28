import React from "react";
import { withRouter } from "react-router-dom";
import { ContentBodyWrapper, WeatherNowHeader } from "./details/details";
import { getCurrentTime } from "../../js/functions";
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherComparision from "./WeatherComparision";
import ContentPageHeader from "./CollectedWeatherInfosHeader";

const localCollectedWeatherInfos = () => {
  return (
    <React.Fragment>
      <ContentPageHeader />
      <ContentBodyWrapper>
        <WeatherNowHeader time={getCurrentTime()} />
        <CurrentWeather />
        <WeatherForecast />
        <WeatherComparision />
      </ContentBodyWrapper>
    </React.Fragment>
  );
};
const CollectedWeatherInfos = withRouter(localCollectedWeatherInfos);
export default CollectedWeatherInfos;
