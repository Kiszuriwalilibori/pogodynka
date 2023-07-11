import * as React from "react";
import { useFavorites } from "hooks";

/**
 * @description creates HOC that add functionality of calling Favorites.manageSupport after loading of component
 * @param
 * @returns
 */

const CheckSupportForLocalStorage = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { Favorites } = useFavorites();

  React.useEffect(() => {
    Favorites.manageSupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children as JSX.Element;
};

export default CheckSupportForLocalStorage;
