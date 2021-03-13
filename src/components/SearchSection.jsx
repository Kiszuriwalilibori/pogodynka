import React from "react";
import { connect } from "react-redux";
import SourceSection from "./SourceSection";
import { SearchContainer } from "./details/details";
import SearchFormFactory from "./SearchForms/SearchFormFactory";
import PropTypes from "prop-types";
import Loader from "./details/loader";
import ProblemMessage from "./details/ProblemMessage";

const Section = props => {
  const { searchFormSourceType } = props;

  return (
    <SearchContainer>
      <Loader />
      <SourceSection />
      <SearchFormFactory formType={searchFormSourceType} />
      <ProblemMessage />
    </SearchContainer>
  );
};

const mapStateToProps = state => ({
  searchFormSourceType: state.searchFormSourceType,
});

const SearchSection = connect(mapStateToProps, null)(Section);
export default SearchSection;

Section.propTypes = {
  searchFormSourceType: PropTypes.string,
};
