import { useSelector } from "react-redux";

import { FormVariants, RootStateType } from "types";
import CitySearchForm from "./SearchByCity";
import SearchByLocation from "./SearchByLocation";
import SearchInFavorites from "./SearchInFavorites";

/**
 * Component Factory which renders certain adequate component depending on props
 * @returns form component or null
 */

const SearchFormFactory = (): JSX.Element | null => {
  const shouldRender = useSelector((state: RootStateType) => state.isSearchFactoryVisible);
  const formVariant = useSelector((state: RootStateType) => state.searchFormSourceType);

  if (!shouldRender) return null;

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

export default SearchFormFactory;
