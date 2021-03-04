import React from "react";
import CitySearchForm from "./CitySearchForm";
import LocationSearchForm from "./LocationSearchForm";

const SearchFormFactory = props => {
  const { formType, getPath } = props;

  switch (formType) {
    case "city":
      return <CitySearchForm getPath={getPath} />;
      break;
    case "location":
      return <LocationSearchForm getPath={getPath} />;
      break;
    default:
      return null;
  }
};

export default SearchFormFactory;
