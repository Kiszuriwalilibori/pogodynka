import React from "react";  
import { connect } from 'react-redux';
import {getCitiesWeather} from '../actions';
import {LocationWeatherWrapper, WeatherNowHeader, WeatherNow,CityHeader,CityNameWrapper } from'../utils/details';
import {getTime} from '../utils/functions';
import Forecast from "./forecast";
import Weather from "./weather";
import Group from "./group";

const _content =(props)=> {
  
  
  const { city} = props;
 

return (
<React.Fragment>
  <CityHeader>
     <CityNameWrapper> 
       {city}
      </CityNameWrapper>
  </CityHeader>  
  <LocationWeatherWrapper>
    <WeatherNow>
        <WeatherNowHeader time={getTime()}  /> 
    </WeatherNow>
   <Weather />
   <Forecast />
   <Group />
  </LocationWeatherWrapper>
</React.Fragment>
)} 


const mapStateToProps = (state) => ({
 
  city: state.currentCity,
  citiesData: state.citiesData,
})

const mapDispatchToProps = (dispatch) => ({    
  onUpdate: (failureFunction) => dispatch(getCitiesWeather(failureFunction)),
});

const Content = connect(mapStateToProps, mapDispatchToProps)(_content);
export default Content;
