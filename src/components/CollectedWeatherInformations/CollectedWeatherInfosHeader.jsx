import React from "react";
import { connect } from "react-redux";
import { ContentHeaderWrapper, ContentHeaderCity } from "./details/details";
import PropTypes from 'prop-types';

const prepareCollectedWeatherInfosHeader = (props) => {
  const { city } = props;
  return city ? (
    <ContentHeaderWrapper>
      <ContentHeaderCity>{city}</ContentHeaderCity>
    </ContentHeaderWrapper>
  ) : null;
};

const mapStateToProps = (state) => ({
  city: state.currentCity,
});
const CollectedWeatherInfosHeader = connect(mapStateToProps)(prepareCollectedWeatherInfosHeader);

export default CollectedWeatherInfosHeader;

prepareCollectedWeatherInfosHeader.propTypes ={
  city: PropTypes.string
}