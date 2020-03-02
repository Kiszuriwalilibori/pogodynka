import fetch from 'isomorphic-fetch';
import {createURL, createResults, validate} from './utils/functions';
import {messages, } from'./utils/messages';
import {citiesArray } from "./utils/arrays";

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
    var success = true;

    // const NoDataHandle =(code, city)=>{
    //   console.log('nodata' , code, city);
    //   let message;
    //   (code === 'weather')? message = messages[code] + city : message = messages[code];
    //   dispatch(getCityDataFailed(message));
    //   success = false;
    //   redirectFailure();
    //   console.log(success);
    // }
    const NoDataHandle =(code, city)=>{
     console.log('nodata' , code, city);
      let message;
      (code === 'networkProblem')? message = messages[code]: message = messages[code] +city;
      dispatch(getCityDataFailed(message));
      redirectFailure();
    }








  const readfromURL =(city, code)=>{ 
    dispatch(getDataRequested());          
      fetch((createURL[code])(city))
        .then((response) => response.json())
          .then((data) => {
            ((validate[code])(data))? dispatch((dispatchReceived[code])(createResults[code](data, city))):NoDataHandle(code, city)/*NoDataHandle(messages[code])*/;
          }
          )
          .catch((error) => { success= false; NoDataHandle('networkProblem');});  
  }
  





  const table = [
    [city, 'weather'],
    [city, 'forecast'],
    [citiesArray, 'group']
  ]


  const readfromURLA =(table)=>{ 
    dispatch(getDataRequested());  
    if (table.length){let [city, code] = table.shift();
        let reduced =[...table];   
      fetch((createURL[code])(city))
        .then((response) => response.json())
          .then((data) => {console.log(data);
            if((validate[code])(data)){ 
              dispatch((dispatchReceived[code])(createResults[code](data, city)));
              (reduced.length)? readfromURLA(reduced): redirectSuccess();
              } 
              else{NoDataHandle(code, city)/*NoDataHandle(messages[code])*/;}
          }
          )
          .catch((error) => { success= false; NoDataHandle('networkProblem');});}  
  }




readfromURLA(table);


  // table.forEach((item)=>{
  //  console.log('ss', success); success && readfromURL(...item)
  //   }
  //   )
  //  success && redirectSuccess()


  }  
}      

