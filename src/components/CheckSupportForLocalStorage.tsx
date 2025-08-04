import React from "react";
import { useFavorites } from "hooks";

/**
 * @description creates HOC that add functionality of calling Favorites.manageSupport after loading of component
 * @param
 * @returns
 */

const CheckSupportForLocalStorageComponent = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { Favorites } = useFavorites();

  React.useEffect(() => {
    Favorites.manageSupport();

  }, []);

  return children as JSX.Element;
};

export const CheckSupportForLocalStorage = React.memo(CheckSupportForLocalStorageComponent);
export default CheckSupportForLocalStorage;
