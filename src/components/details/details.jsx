import React from "react";
import { stringifyWeatherData } from "../../js/functions";
import { Button} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {colors} from "../../js/fixtures";

// Displays headline with info about date and time of weather datacollection
export const WeatherNowHeader = ({ time }) => {
  return (
    <p className="weather__header">
      <strong>Pogoda </strong>
      <span>godź. </span>
      <span>{time}</span>
    </p>
  );
};

//Displays current temperature in target city
export const WeatherNowTemp = ({ temp }) => {
  const temp_str = temp.toString() + "°C";

  return <span className="weather__tempearture">{temp_str}</span>;
};

//Displays current air humidity in target city
export const WeatherNowMoisture = ({ moisture }) => {
  return (
    <div className="weather-item__container">
      <p className="weather-item__header">Wilgotność powietrza</p>
      <span className="weather-item__content">{stringifyWeatherData(moisture, "humidity")}</span>
    </div>
  );
};

// Displays current sensed temperature in target city
export const WeatherNowFeelsLike = ({ feels }) => {
  return (
    <div className="weather-item__container">
      <p className="weather-item__header">Temperatura Odczuwalna</p>
      <span className="weather-item__content">{stringifyWeatherData(feels, "feels_like")}</span>
    </div>
  );
};

// Displays current atmospheric pressure in target city

export const WeatherNowPressure = ({ pressure }) => {
  return (
    <div className="weather-item__container">
      <p className="weather-item__header">Ciśnienie</p>
      <span className="weather-item__content">{stringifyWeatherData(pressure, "pressure")}</span>
    </div>
  );
};

//wrapper for all items rereferring to  current weather in target city
export const WeatherNowContent = (props) => {
  return <div className="weather__content">{props.children}</div>;
};
//element displaying neme of current city
export const ContentHeaderCity = (props) => {
   return <div className="content__header-cityname">{props.children}</div>;
};

//wrapper for element displaying name of the current city
export const ContentHeaderWrapper = (props) => {
  return <div className="content__header">{props.children}</div>;
};
//wrapper for all but header elements of content page
export const ContentBodyWrapper = (props) => {
  return <div className="content__body">{props.children}</div>;
};


export const SearchContainer = (props)=>{
  return   <section className="search__container">{props.children}</section>
}

export const MyButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: colors.background,
    height: '50px',
    margin: '8px',
    padding: '0 16px',
    fontFamily: 'Montserrat',
    borderRadius: 'initial',
    boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
    
    '&:hover': {
      backgroundColor:  colors.background_hover,
    },
  },
}))(Button);


export const useFormStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    border:"4px solid #224749",
    borderRadius: "42px",
    padding: "10px 20px",
    background: colors.background_grey,
    margin: "0 1vw",
    marginTop: '60px',
    boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
    "@media (max-width: 548px)": {flexDirection: 'column'},
    "& .MuiOutlinedInput-root":{
      borderRadius: 'initial',
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
    },
    "& .MuiInputBase-root": {
      color: "white !important",
      fontFamily: "Open Sans, sans-serif !important",
      backgroundColor: colors.background,
      padding: '5px 0',
      '&:hover': {
        backgroundColor: colors.background_hover,
      },
    },
    "& .MuiFormLabel-root": { color: "white !important" },
    "& .MuiOutlinedInput-notchedOutline": { border: "3px solid", borderColor: "#224749 !important" },
    
  },
}));

