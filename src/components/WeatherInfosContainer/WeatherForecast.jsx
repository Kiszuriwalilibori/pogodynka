import React from "react";
import { connect } from "react-redux";
import { forecastHeaders } from "../../js/fixtures";
import PropTypes from 'prop-types';
var index =0;
const ind = ind ||function(){ 
  index = index+1;
  return index;
}
const prepareWeatherForecast = (props) => {
  const { forecast, isVisible } = props;
  
  const tableRow = (data) => {
    return (
      <tr key={ind()}>
        {data.map((item) => {
          return <td key={ind()}>{String(item)}</td>;
        })}
      </tr>
    );
  };

  return forecast.length && isVisible ? (
    <React.Fragment>
      <h1>Prognoza 3-dniowa</h1>
      <table className="forecast__table">
        <thead>
          <tr>
            {forecastHeaders.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{forecast.map((item) => tableRow(item))}</tbody>
      </table>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state) => ({
  forecast: state.Forecast,
  isVisible: state.isForecastVisible
});

const WeatherForecast = connect(mapStateToProps)(prepareWeatherForecast);
export default WeatherForecast;

prepareWeatherForecast.propTypes={

  forecast:PropTypes.arrayOf(PropTypes.array),
  isVisible:PropTypes.bool
}
