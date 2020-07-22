import fetch from 'isomorphic-fetch';
import {createURL, createResults, validate} from '../../js/functions';
import {citiesArray, messages} from "../fixtures";

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const GET_CITY_DATA_RECEIVED = 'GET_CITY_DATA_RECEIVED';
export const GET_CITY_FORECAST_RECEIVED ='GET_CITY_FORECAST_RECEIVED';
export const GET_CITY_DATA_FAILED = 'GET_CITY_DATA_FAILED';
export const GET_GROUP_RECEIVED = 'GET_GROUP_RECEIVED';

export function getDataRequested() {
  return {
    type: GET_DATA_REQUESTED,
  };
}

export function getCityDataFailed(error) {
  return {
    type: GET_CITY_DATA_FAILED,
    payload: error,
  };
}

export var dispatchReceived ={
  weather:function (data) {
    return {
      type: GET_CITY_DATA_RECEIVED,
      payload: data,
    };
  },

  forecast:function (data) {
    return {
      type: GET_CITY_FORECAST_RECEIVED,
      payload: data,
    };
  },
  group: function (data) {
    return {
      type: GET_GROUP_RECEIVED,
      payload: data,
    };
  }
}


export function getWeather(city, redirectFailure, redirectSuccess) { 

  return (dispatch) => {
    
    const NoDataHandle =(code, city)=>{//code indicates where the failre happens(ws it when fetching target city weather, forecast, or group)
   
      let message;
      (code === 'networkProblem' || code=== 'group')? message = messages[code]: message = messages[code] + city;
      dispatch(getCityDataFailed(message));
      redirectFailure();
    }

  const table = [
    [city, 'weather'],
    [city, 'forecast'],
    [citiesArray, 'group']
  ]

  const readfromURL =(table)=>{ 
    dispatch(getDataRequested());//sends action that data is requested  
    if (table.length){let [city, code] = table.shift(); //checks whether passed argumets are not empty - if OK takes first elelment and destructurises it
        let reduced =[...table];   //copies remaining elements to new table
      fetch((createURL[code])(city))// initiates connection with server where URL is dynamically created
        .then((response) => response.json())
          .then((data) => {
            if((validate[code])(data)){ // if conection is OK, validates resulting data
              dispatch((dispatchReceived[code])(createResults[code](data, city))); //if data validation is OK process with data to form that is usefull for future operations
              (reduced.length)? readfromURL(reduced): redirectSuccess();//if there is still something in the table with arguments the function calls itself again(with reduced arguments) otherwise it dispatches redirect request to success page
              } 
              else{NoDataHandle(code, city);} //if validation failed it calls failure handler with code(which informs at which stage it happened)
          }
          )
          .catch((error) => {NoDataHandle('networkProblem');});} // if connection is not OK it calls failure handler with network problem code
  }




readfromURL(table);



  }  
}      

