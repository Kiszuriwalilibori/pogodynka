import fetch from 'isomorphic-fetch';
import {cityExists, createCityWeatherURL, createCityForecastURL, createGroupURL, groupExists} from './utils/functions';
import {messages} from'./utils/messages';
import {getDataFromForecast } from './utils/functions';
import{forecastListPaths, forecastListKelvin, citiesArray } from "./utils/arrays";
import _ from 'lodash';


export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export const GET_CITY_DATA_RECEIVED = 'GET_CITY_DATA_RECEIVED';
export const GET_CITY_FORECAST_RECEIVED ='GET_CITY_FORECAST_RECEIVED';
export const GET_CITY_DATA_FAILED = 'GET_CITY_DATA_FAILED';

export const GET_CITIES_DATA_RECEIVED = 'GET_CITIES_DATA_RECEIVED';
export const GET_GROUP_RECEIVED = 'GET_GROUP_RECEIVED';

export function getDataRequested() {
  return {
    type: GET_DATA_REQUESTED,
  };
}

export function getDataDone(data) {
  return {
    type: GET_DATA_DONE,
    payload: data,
  };
}

export function getDataFailed(error) {
  return {
    type: GET_DATA_FAILED,
    payload: error,
  };
}




export function getData() {
  return (dispatch) => {
    // set state to "loading"
    dispatch(getDataRequested());

    fetch('https://api.myjson.com/bins/8qjek')

      .then((response) => response.json())
      .then((data) => {
        // set state for success
        const dane = data.map(Object.values);
        dispatch(getDataDone(dane));
      })
      .catch((error) => {
        // set state for error
        dispatch(getDataFailed(error));
      });
  };
}


  
export function getCitiesWeather(failureFunction) {
  return (dispatch) => {
    // set state to "loading"
    dispatch(getDataRequested());

    
    const cities=['Warszawa','Kraków','Gdańsk','Poznań','Rzeszów','Białystok'];
    const resultArray = [];
    let result;

      function getWeather(city){
          fetch('http://api.openweathermap.org/data/2.5/weather?q=' +city+ '&appid=da16d6de03fba61dd8b294b58864d4b7')
  
          .then((response) => response.json())
          .then((data) => {
          result = {currentCity: city, currentCityData: data}
          resultArray.push(result);
          
          })
          .catch((error) => {
          dispatch(getDataFailed(error));
          failureFunction();
          });
      }

  cities.forEach(getWeather);
  dispatch(getCitiesDataReceived(resultArray));
  };
}






  
export function getCityWeather(city, redirectFailure, redirectSuccess) {
  return (dispatch) => {

  const NetworkErrorHandle =(error)=>{
    console.log(error);
    dispatch(getCityDataFailed(messages.networkProblem));
    redirectFailure();
  }
  const CityWeatherNotFoundHandle =()=>{
    dispatch(getCityDataFailed(messages.noData + city));
    redirectFailure();
  }


  dispatch(getDataRequested());    
    fetch(createCityWeatherURL(city))
    .then((response) => response.json())
      .then((data) => {
        if(cityExists(data)){
            const result ={currentCity: city, currentCityData: data}
            dispatch(getCityDataReceived(result)); 
            redirectSuccess();
        }
        else{CityWeatherNotFoundHandle();}
      })
      .catch((error) => {
        NetworkErrorHandle();
      });
      

  dispatch(getDataRequested());          
    fetch(createCityForecastURL(city))
    .then((response) => response.json())
      .then((data) => {
        if(cityExists(data)){
            if(_.size(data) && data.list ){
              var reducedForecast = data.list.map(
                (item)=>{
                  return getDataFromForecast(forecastListPaths, item, forecastListKelvin);
                }
              )
            }
            dispatch(getCityForecastReceived(reducedForecast)); 
            redirectSuccess();
        }
        else{CityWeatherNotFoundHandle();}
      })
      .catch((error) => {
        NetworkErrorHandle();
      }); 
      
      

      dispatch(getDataRequested());    
      fetch(createGroupURL(citiesArray))
      .then((response) => response.json())
        .then((data) => {
          if(groupExists(data)){
              dispatch(getGroupReceived(data.list)); 
              redirectSuccess();
          }
          else{CityWeatherNotFoundHandle();}
        })
        .catch((error) => {
         NetworkErrorHandle();
        });
        
  












  };
}














export function getCityDataReceived(data) {
  return {
    type: GET_CITY_DATA_RECEIVED,
    payload: data,
  };
}


export function getCityForecastReceived(data) {
  return {
    type: GET_CITY_FORECAST_RECEIVED,
    payload: data,
  };
}


export function getCityDataFailed(error) {
  return {
    type: GET_CITY_DATA_FAILED,
    payload: error,
  };
}


export function getCitiesDataReceived(data) {
  return {
    type: GET_CITIES_DATA_RECEIVED,
    payload: data,
  };
}


export function getGroupReceived(data) {
  return {
    type: GET_GROUP_RECEIVED,
    payload: data,
  };
}
