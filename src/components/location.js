import React from "react"; 
import { connect } from 'react-redux';
import {LinkToCities} from '../utils/links';
import { _location } from "../styles/styles";
import _ from 'lodash';
import {WeatherNowHeader, WeatherNowTemp, WeatherNowMoisture} from'../utils/details';
import {getTime} from '../utils/functions';



  const _Location =(props)=> {

    const {data, city} = props;

    if(_.size(data)){

    return (
    <React.Fragment>
     
      <_location.cityHeader>
         <_location.cityNameWrapper> 
           {city}
          </_location.cityNameWrapper>
      </_location.cityHeader>  
      <_location.wrapper>
        <_location.weatherNow>
            <WeatherNowHeader time={getTime()}  /> 
         
            <_location.weatherNowContent>
              <WeatherNowTemp temp={data.main.temp} />
             
            </_location.weatherNowContent>
          
        </_location.weatherNow>
       
       {LinkToCities}
       
      </_location.wrapper>
    </React.Fragment>
    )} else{return(null);};
    }


    const mapStateToProps = (state) => ({
      data: state.currentCityData,
      city: state.currentCity,
    })
    
    const Location = connect(mapStateToProps)(_Location);

 export default Location;