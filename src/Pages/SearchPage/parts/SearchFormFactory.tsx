import * as React from "react";

import { connect } from "react-redux";

import CitySearchForm from "./CitySearchForm";
import LocationSearchForm from "./LocationSearchForm";
import FavoritesSearchForm from "./FavoritesSearchForm";

import { renderConditionally } from "HOCs";
import { FormVariants, RootStateType } from "types";

type Props = {
  formVariant: string;
  renderCondition: boolean;
};
/**
 * Component Factory which renders certain adequate component depending on props
 * @param formVariant string that holds information where the component has beeen actually fired
 * @returns form component or null
 */

const _SearchFormFactory = (props: Props): JSX.Element | null => {
  const { formVariant } = props;

  switch (formVariant) {
    case FormVariants.CITY:
      return <CitySearchForm />;
    case FormVariants.LOCATION:
      return <LocationSearchForm />;
    case FormVariants.FAVORITES:
      return <FavoritesSearchForm />;
    default:
      return null;
  }
};

const mapStateToProps = (state: RootStateType) => ({
  renderCondition: state.isSearchFactoryVisible,
  formVariant: state.searchFormSourceType,
});
const SearchFormFactory = connect(mapStateToProps, null)(renderConditionally(_SearchFormFactory));
export default SearchFormFactory;
