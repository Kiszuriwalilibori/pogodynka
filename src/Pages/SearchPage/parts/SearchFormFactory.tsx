import { connect } from "react-redux";

import CitySearchForm from "./SearchByCity";
import SearchByLocation from "./SearchByLocation";
import SearchInFavorites from "./SearchInFavorites";

import { renderConditionally } from "HOCs";
import { FormVariants, RootStateType } from "types";

type Props = {
  formVariant: string;
  shouldRender: boolean;
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
      return <SearchByLocation />;
    case FormVariants.FAVORITES:
      return <SearchInFavorites />;
    default:
      return null;
  }
};

const mapStateToProps = (state: RootStateType) => ({
  shouldRender: state.isSearchFactoryVisible,
  formVariant: state.searchFormSourceType,
});
const SearchFormFactory = connect(mapStateToProps, null)(renderConditionally(_SearchFormFactory));
export default SearchFormFactory;
