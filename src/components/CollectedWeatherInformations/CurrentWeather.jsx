import React from "react";
import { connect } from "react-redux";
import { WeatherNowTemp, WeatherNowMoisture, WeatherNowFeelsLike, WeatherNowPressure, WeatherNowContent } from "../details/details";
import PropTypes from 'prop-types';
const prepareCurrentWeather = (props) => {
  const { data } = props;

  return data.main ? (
    <WeatherNowContent>
      <WeatherNowTemp temp={data.main.temp} />
      <WeatherNowFeelsLike feels={data.main.feels_like} />
      <WeatherNowMoisture moisture={data.main.humidity} />
      <WeatherNowPressure pressure={data.main.pressure} />
    </WeatherNowContent>
  ) : null;
};

const mapStateToProps = (state) => ({
  data: state.currentCityData,
});

const CurrentWeather = connect(mapStateToProps)(prepareCurrentWeather);

export default CurrentWeather;

prepareCurrentWeather.propTypes ={
  data:PropTypes.object
}