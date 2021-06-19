import React from "react";
import { connect } from "react-redux";
import { compareWeather } from "../../js/functions";
import { groupTableHeaders, parameters } from "../../js/fixtures";
import { getLabelfromPath } from "../../js/functions";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";
var index = 0;
const ind =
  ind ||
  function () {
    index = index + 1;
    return index;
  };
const PrepareWeatherComparision = props => {
  let { weather, favoritesWeather, isVisible} = props;
  
  let locationObj = useLocation();
  const location = getLabelfromPath(locationObj.pathname);

  const header = "Porównanie pogody w " + location + " i innych miejscach";
  var createCell = item => {
    return typeof item == "string" ? (
      <td key={String(Math.random())}>{item}</td>
    ) : (
      <td key={ind()}>
        <p>{item.value}</p>
        <p>{item.comment}</p>
      </td>
    );
  };
  var createRow = (data, index) => {
    return (
      <tr key={data}>
        {data.map(item => {
          return createCell(item);
        })}
      </tr>
    );
  };

  if (favoritesWeather.data && weather && isVisible) {
    //console.log('group and weather', group, weather);
    let Weather = {};
    parameters.forEach(element => {
      Weather[element] = weather.main[element];
    });
    const group_main_array = [];
    let Group = favoritesWeather.data.forEach(item => {
      group_main_array.push(item.main);
    });
    Group = group_main_array;
    var ComparativeTable = Group.map(item => {
      return compareWeather(Weather, item, Object.keys(Weather));
    });
    ComparativeTable.forEach((item, index) => {
      item.unshift(favoritesWeather.labels[index]);
    }); //add as city names to the array from static table, if taken from API response would be without polish characters
  }

  return ComparativeTable && isVisible? (
    <React.Fragment>
      <h1>{header}</h1>
      <table className="comparative__table">
        <thead>
          <tr key={String(Math.random())}>
            <th>Miasto</th>
            {groupTableHeaders.map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{ComparativeTable.map((item, index) => createRow(item, index))}</tbody>
      </table>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = state => ({
  weather: state.currentCityData,
  group: state.Group,
  favoritesWeather: state.favoritesWeather,
  isVisible:state.isWeatherComparisionVisible,

  
});

const WeatherComparision = connect(mapStateToProps)(PrepareWeatherComparision);

export default WeatherComparision;

PrepareWeatherComparision.propTypes = {
  weather: PropTypes.object,
  group: PropTypes.array,
};
