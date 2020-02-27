import React from "react"; 



export const WeatherNowHeader =({time})=>{
  
    return( 
        <p className= 'weatherNowHeader'>
            <strong>Pogoda </strong><span>zgodnie z danymi zebranymi dzisiaj, godź. </span><span>{time}</span>
        </p>
    )
  }
  
  
  
export const WeatherNowTemp =({temp})=>{

  const temp_str = temp.toString() +"°C"  ;
  
    return( 
      
        <span className= 'weatherNowTemp'>
          {temp_str}
        </span>
        
          
    )
  }

  
  export const WeatherNowMoisture =({moisture})=>{
   
    const humidity_str = moisture.toString() +"%"
      return( 
        <div className = 'weatherNowItemWrapper'>
         <p className  = 'weatherNowItemHeader' >Wilgotność powietrza</p>
         
            <span className= 'weatherNowItemContent'>
                {humidity_str}
            </span>
          
        </div>               
            
      )
    }
  
  
  
 
    export const WeatherNowFeelsLike =({feels})=>{
        
        const feels_str = Math.round(feels).toString() +"°C"  ;
        return( 
          <div className = 'weatherNowItemWrapper'>
           <p className  = 'weatherNowItemHeader' >Temperatura Odczuwalna</p>
           
              <span className= 'weatherNowItemContent'>
                  {feels_str}
              </span>
            
          </div>               
              
        )
      }
    
    
  
 
      export const WeatherNowPressure =({pressure})=>{
        const pressure_str = ((Math.round(pressure)).toString() ) +"hPa"  ;
  
        return( 
          <div className = 'weatherNowItemWrapper'>
           <p className  = 'weatherNowItemHeader' >Ciśnienie</p>
           
              <span className= 'weatherNowItemContent'>
                  {pressure_str}
              </span>
            
          </div>               
              
        )
      }
    
    
export const WeatherNowContent = (props)=>{
    return(
        <div className ='weatherNowContent'>
            {props.children}
        </div>
    )
}


export const WeatherNow = (props)=>{

    return(
        <div>
            {props.children}
        </div>
    )
}



export const CityNameWrapper = (props)=>{

    return(
        <div className = 'cityNameWrapper'>
            {props.children}
        </div>
    )
}


export const CityHeader = (props)=>{

    return(
        <div className = 'cityHeader'>
            {props.children}
        </div>
    )
}



export const LocationWeatherWrapper = (props)=>{

    return(
        <div className = 'locationWeatherWrapper'>
            {props.children}
        </div>
    )
}

