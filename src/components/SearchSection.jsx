import React from "react";
import { connect } from "react-redux";
import SourceSection from "./SourceSection";
import { SearchContainer } from "./details/details";
import SearchFormFactory from "./SearchForms/SearchFormFactory";
import PropTypes from "prop-types";
import Loader from "./details/loader";

const PrepareSearchSection = props => {
  const { searchFormSourceType } = props;

  return (
    <SearchContainer>
      <Loader />
      <SourceSection />
      <SearchFormFactory formType={searchFormSourceType} />
    </SearchContainer>
  );
};

const mapStateToProps = state => ({
  searchFormSourceType: state.searchFormSourceType,
});

const SearchSection = connect(mapStateToProps, null)(PrepareSearchSection);
export default SearchSection;

PrepareSearchSection.prepTypes = {
  city: PropTypes.string,
  onSubmit: PropTypes.func,
};
