import React from "react";
import { connect } from "react-redux";
import { ContentHeaderWrapper, ContentHeaderCity } from "./details/details";

const _CollectedWeatherInfosHeader = (props) => {
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
const CollectedWeatherInfosHeader = connect(mapStateToProps)(_CollectedWeatherInfosHeader);

export default CollectedWeatherInfosHeader;
