import React from "react";
import Fade from "@material-ui/core/Fade";
export const WeatherShortDescription = props => {
  const { data } = props;
  const weatherDescription = data?.weather[0]?.description;
  const icon = data?.weather[0]?.icon;
  var iconURL;

  return (weatherDescription || icon) && (
    <Fade in={true} timeout={1000}>
    <div className="weather__description">
      <img src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"} alt="weather icon"></img>
      {weatherDescription}
    </div>
    </Fade>
  );
};
