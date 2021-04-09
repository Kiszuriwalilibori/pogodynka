import React from "react";
import CitySearchForm from "./CitySearchForm";
import LocationSearchForm from "./LocationSearchForm";
import FavoritesSearch_Form from "./FavoritesSearch_Form";


const SearchFormFactory = props => {
  const { formType } = props;

  switch (formType) {
    case "city":
      return <CitySearchForm />;
      break;
    case "location":
      return <LocationSearchForm />;
      break;
      case "favorites":
        return <FavoritesSearch_Form />;
        break; 
    default:
      return null;
  }
};

export default SearchFormFactory;
