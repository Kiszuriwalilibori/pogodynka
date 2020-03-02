// this file contains small React views, too meaningfull to be regarded as components 

import React from "react";
import  {stringifyWeatherData} from './functions';

// Displays headline with info about date and time of weather datacollection
export const WeatherNowHeader =({time})=>{
  
    return( 
        <p className= 'weather__header'>
            <strong>Pogoda </strong><span>zgodnie z danymi zebranymi dzisiaj, godź. </span><span>{time}</span>
        </p>
    )
}
  
  
//Displays current temperature in target city 
export const WeatherNowTemp =({temp})=>{

  const temp_str = temp.toString() +"°C"  ;
  
    return(      
        <span className = 'weather__tempearture'>
          {temp_str}
        </span>
    )
}

//Displays current air humidity in target city  
export const WeatherNowMoisture =({moisture})=>{  
    
    return( 
        <div className = 'weather-item__container'>
            <p className  = 'weather-item__header' >
                Wilgotność powietrza
            </p>
            <span className= 'weather-item__content'>
                {stringifyWeatherData( moisture, 'humidity')}
            </span>
        </div>                  
    )
}

  
// Displays current sensed temperature in target city
export const WeatherNowFeelsLike =({feels})=>{  
   
    return( 
        <div className = 'weather-item__container'>
        <p className  = 'weather-item__header' >Temperatura Odczuwalna</p>
            <span className= 'weather-item__content'>
                {stringifyWeatherData( feels, 'feels_like')}
            </span>
        </div>                    
    )
}


// Displays current atmospheric pressure in target city 

export const WeatherNowPressure =({pressure})=>{
    return( 
        <div className = 'weather-item__container'>
            <p className  = 'weather-item__header' >
                Ciśnienie
            </p>
            <span className= 'weather-item__content'>
                {stringifyWeatherData( pressure, 'pressure')}
            </span>
        </div>                     
    )
}

//wrapper for all items rereferring to  current weather in target city    
export const WeatherNowContent = (props)=>{
    return(
        <div className ='weather__content'>
            {props.children}
        </div>
    )
}
//element displaying neme of current city
export const ContentHeaderCity = (props)=>{

    return(
        <div className = 'content__header-cityname'>
            {props.children}
        </div>
    )
}

//wrapper for element displaying name of the current city
export const ContentHeaderWrapper = (props)=>{

    return(
        <div className = 'content__header'>
            {props.children}
        </div>
    )
}
//wrapper for all but header elements of content page
export const ContentBodyWrapper = (props)=>{

    return(
        <div className = 'content__body'>
            {props.children}
        </div>
    )
}

