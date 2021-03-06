import React from "react";
import CitySearchForm from "./CitySearchForm";
import LocationSearchForm from "./LocationSearchForm";

const SearchFormFactory = props => {
  const { formType } = props;

  switch (formType) {
    case "city":
      return <CitySearchForm />;
      break;
    case "location":
      return <LocationSearchForm />;
      break;
    default:
      return null;
  }
};

export default SearchFormFactory;
