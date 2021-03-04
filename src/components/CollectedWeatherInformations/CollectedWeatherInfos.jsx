import React from "react";
import { withRouter } from "react-router-dom";
import { ContentBodyWrapper} from "../details/details";
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherComparision from "./WeatherComparision";
import ContentPageHeader from "./CollectedWeatherInfosHeader";

const localCollectedWeatherInfos = () => {
  return (
    <React.Fragment>
      <ContentPageHeader />
      <ContentBodyWrapper>
        <CurrentWeather />
        <WeatherForecast />
        <WeatherComparision />
      </ContentBodyWrapper>
    </React.Fragment>
  );
};
const CollectedWeatherInfos = withRouter(localCollectedWeatherInfos);
export default CollectedWeatherInfos;
