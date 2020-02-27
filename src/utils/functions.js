import{comments } from "./arrays";


export const cityExists =(obj)=>{

if(typeof obj === 'object' && obj !== null){ return (obj.hasOwnProperty("cod") && obj.cod === 200)? true :false;

}
else{return(false)}
}

export const createCityForecastURL = (str)=>{ return('https://api.openweathermap.org/data/2.5/forecast?q=' + str +'&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7')}
export const createCityWeatherURL = (str)=>{ return('https://api.openweathermap.org/data/2.5/weather?q=' + str +'&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7')}

export const getTime =()=>{

    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();  
    return (time);

}

export const getDataFromForecast = (paths, forecast, Kelvin)=>{
  let result=[];
  if(forecast.dt_txt){
    
    result.push(forecast.dt_txt)  
    const main = forecast.main;
    paths.forEach((item)=>{ if(main[item]) {result.push(main[item])} else{ result.push('n/a')}})
  }
  Kelvin.forEach((item)=>{
    if(result[item]){
      const temp = Math.round(result[item]);
        result[item] = temp;}   

    })

  return result;
};

export const createGroupURL =(arr)=>{

  let ids ='';

  arr.forEach((item)=>{ids = ids + ',' + item[1]});
  ids = ids.slice(1);
  const result = 'https://api.openweathermap.org/data/2.5/group?id='+ids +'&units=metric&appid=da16d6de03fba61dd8b294b58864d4b7';

  return result;
}

export const groupExists =(obj)=>{

return (obj && obj.hasOwnProperty('cnt') && obj.cnt && obj.hasOwnProperty('list')   )? true: false; 

}



export const compareWeather =(weatherRow, groupRow, keys)=>{

  var resultArray =[];
     
   const getRelation =(a,b)=>{
   return (a>b)? 0:(a===b)?1:2;
   }
                      
   keys.forEach((item)=>{
     
       const relation = getRelation(weatherRow[item], groupRow[item]);
       const relativeRatio = (comments[item])[relation];
       const result ={value: groupRow[item], comment: relativeRatio};
       resultArray.push(result);
       }
   )
return resultArray;
}

