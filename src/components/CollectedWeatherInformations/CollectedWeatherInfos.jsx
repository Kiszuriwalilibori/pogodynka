import React from "react";
import { withRouter } from "react-router-dom";
import { ContentBodyWrapper} from "../details/details";
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherComparision from "./WeatherComparision";
import ContentPageHeader from "./CollectedWeatherInfosHeader";
import StorePlaceInFavorites_Switch from '../StorePlaceInFavorites_Switch';
import ProblemMessage from "../details/ProblemMessage";
import MySnackBar from "../details/MySnackBar";

const localCollectedWeatherInfos = () => {
  return (
    <React.Fragment>
      <ContentPageHeader />
      <ContentBodyWrapper>
      <MySnackBar />
      <ProblemMessage />
      <StorePlaceInFavorites_Switch />
        <CurrentWeather />
        <WeatherForecast />
        <WeatherComparision />
      </ContentBodyWrapper>
    </React.Fragment>
  );
};
const CollectedWeatherInfos = withRouter(localCollectedWeatherInfos);
export default CollectedWeatherInfos;
