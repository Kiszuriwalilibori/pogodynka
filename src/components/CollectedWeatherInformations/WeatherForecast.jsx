import React from "react";
import { connect } from "react-redux";
import { forecastHeaders } from "../../js/fixtures";

const _WeatherForecast = (props) => {
  const { forecast } = props;

  const tableRow = (data) => {
    return (
      <tr key={data}>
        {data.map((item) => {
          return <td key={item}>{String(item)}</td>;
        })}
      </tr>
    );
  };

  return forecast.length ? (
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
});

const WeatherForecast = connect(mapStateToProps)(_WeatherForecast);
export default WeatherForecast;
