import React from "react";
import { withRouter } from "react-router-dom";
import { WeatherInfosContentContainer } from "../details/details";
import WeatherForecast from "./WeatherForecast";
import WeatherCurrent from "./WeatherCurrent";
import WeatherComparision from "./WeatherComparision";
import WeatherInfosHeader from "./WeatherInfosHeader";
import StorePlaceInFavorites_Switch from "../StorePlaceInFavorites_Switch";
import ShowWeatherComparision_Switch from "../ShowWeatherComparision_Switch";
import ShowForecast_Switch from "../ShowForecast_Switch";
import ProblemMessage from "../details/ProblemMessage";
import UniversalSnackBar from "../details/UniversalSnackBar";

const localCollectedWeatherInfos = () => {
  return (
    <React.Fragment>
      <WeatherInfosHeader />
      <WeatherInfosContentContainer>
        <UniversalSnackBar />
        <ProblemMessage />
        <StorePlaceInFavorites_Switch />
        <ShowWeatherComparision_Switch />
        <ShowForecast_Switch />
        <WeatherCurrent />
        <WeatherForecast />
        <WeatherComparision />
      </WeatherInfosContentContainer>
    </React.Fragment>
  );
};
const WeatherInfosContainer = withRouter(localCollectedWeatherInfos);
export default WeatherInfosContainer;
