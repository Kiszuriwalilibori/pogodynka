import React from "react";
import { connect } from "react-redux";
import { ContentHeaderWrapper, ContentHeaderCity, WeatherNowHeader } from "../details/details";
import { getCurrentTime } from "../../js/functions";
import PropTypes from "prop-types";

const prepareCollectedWeatherInfosHeader = props => {
  let { city } = props;

  if (typeof city === "object" && city !== null) {
    city = "Latitude: " + city.lat + "Longitude: " + city.lon;
  }
  return city ? (
    <ContentHeaderWrapper>
      <ContentHeaderCity>{city}</ContentHeaderCity>
      <WeatherNowHeader time={getCurrentTime()} />
    </ContentHeaderWrapper>
  ) : null;
};

const mapStateToProps = state => ({
  city: state.currentCity,
});
const CollectedWeatherInfosHeader = connect(mapStateToProps)(prepareCollectedWeatherInfosHeader);

export default CollectedWeatherInfosHeader;

prepareCollectedWeatherInfosHeader.propTypes = {
  city: PropTypes.string,
};
