import React from "react";  
import { connect } from 'react-redux';

import _ from 'lodash';
import {WeatherNowTemp, WeatherNowMoisture, WeatherNowFeelsLike, WeatherNowPressure, WeatherNowContent, WeatherNow,CityHeader,CityNameWrapper } from'../utils/details';


const _weather =(props)=> {

    const {data} = props;

    return(
        data.main?
        <WeatherNowContent>
              <WeatherNowTemp temp = {data.main.temp} />
              <WeatherNowFeelsLike feels = {data.main.feels_like} />
              <WeatherNowMoisture moisture = {data.main.humidity} />
              <WeatherNowPressure pressure = {data.main.pressure} />
        </WeatherNowContent>:null  
    )
    
}



const mapStateToProps = (state) => (
    {
        data: state.currentCityData
    }
)


const Weather = connect(mapStateToProps)(_weather);

export default Weather;

