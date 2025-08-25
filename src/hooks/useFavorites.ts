import { t } from "i18next";

import useMessage from "./useMessage";
import useDispatchAction from "./useDispatchAction";

import { LocalStorage, FilteredStorage } from "js/functions";
import { PlaceType } from "types";

interface FavoritesType extends FilteredStorage {
  placeInFavoritesAlready: Function;
  placeNotInFavoritesYet: Function;
  showSize: ()=>void;
  manageSupport: ()=>boolean;
  add: Function;
}

const useFavorites = () => {
  const { cacheSupported } = useDispatchAction();
  const {setHasFavorites}=useDispatchAction();
  const showMessage = useMessage();

  const Favorites = new FilteredStorage(item => item.category === "place") as FavoritesType;

  const showFavoritesSize = () => {
    const length = Favorites.getLength();
    if (length) {
      showMessage.info(t("favs.place_number", { length: length }));
    } else {
      showMessage.info(t("favs.empty"));
    }
  };
  const manageSupport = () => {
    const isSupported = LocalStorage.isSupported();
    if (isSupported) {
      cacheSupported(true);
      const length = Favorites.getLength();
      const size = length ? t("favs.place_number", { length: length }) : t("favs.empty");
      showMessage.info(`${t("favs.serviced")} ${size}`);
      length && setHasFavorites(true);
    } else {
      cacheSupported(false);
      showMessage.warning(t("favs.not_serviced"));
    }

    return isSupported;
  };
  const placeInFavoritesAlready = (str: string) => {
    const result = Favorites.hasCertainItem((item: { label: string }) => item.label === str);
    //todo w tym miejscu powyżej wyrzuci błąd jeżeli w localStorage zamienimy any na T w FilteringFunction
    return result;
  };
  const placeNotInFavoritesYet = (str: string) => {
    const result = !Favorites.hasCertainItem((item: { label: string }) => item.label === str);

    return result;
  };

  const addToFavorites = (label: string, place: PlaceType) => {
    try {
      LocalStorage.set(label, place);
      showMessage.success(t("favs.add_success", { label: label }));
      window && window.dispatchEvent(new Event("storage")); //puszcza zdarzenie zmiany localStorage. odczytywane póxniej
      setHasFavorites(true);
      return true;
    } catch (error) {
      showMessage.error(t("favs.add_error", { label: label }));
return false;
    }
  };

  Favorites.placeNotInFavoritesYet = placeNotInFavoritesYet;
  Favorites.placeInFavoritesAlready = placeInFavoritesAlready;
  Favorites.showSize = showFavoritesSize;
  Favorites.manageSupport = manageSupport;
  Favorites.add = addToFavorites;

  return { Favorites, placeInFavoritesAlready, addToFavorites };
};
export default useFavorites;
