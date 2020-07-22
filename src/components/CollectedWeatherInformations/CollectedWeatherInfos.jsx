import React from "react";  
import { withRouter } from 'react-router-dom';
import {ContentBodyWrapper, WeatherNowHeader} from'./details/details';
import {getTime} from '../../js/functions';
import WeatherForecast from "./WeatherForecast";
import CurrentWeather from "./CurrentWeather";
import WeatherComparision from "./WeatherComparision";
import ContentPageHeader from './CollectedWeatherInfosHeader';

const _CollectedWeatherInfos = ()=>{

return (
<React.Fragment>
  <ContentPageHeader />
  <ContentBodyWrapper>
    <WeatherNowHeader time={getTime()}  /> 
    <CurrentWeather />
    <WeatherForecast />
    <WeatherComparision />
  </ContentBodyWrapper>
</React.Fragment>
)}
const CollectedWeatherInfos = withRouter(_CollectedWeatherInfos);
export default CollectedWeatherInfos;
