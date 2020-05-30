import React from "react";  
import { withRouter } from 'react-router-dom';
import {ContentBodyWrapper, WeatherNowHeader} from'../utils/details';
import {getTime} from '../utils/functions';
import Forecast from "./forecast";
import Weather from "./weather";
import Group from "./group";
import ContentPageHeader from './contentheader';

const _ContentPage = ()=>{

return (
<React.Fragment>
  <ContentPageHeader />
  <ContentBodyWrapper>
    <WeatherNowHeader time={getTime()}  /> 
    <Weather />
    <Forecast />
    <Group />
  </ContentBodyWrapper>
</React.Fragment>
)}
const ContentPage = withRouter(_ContentPage);
export default ContentPage;
