import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { FormVariants, PlaceVariants, RootStateType } from "types";
import { useFavorites, useBoolean } from "hooks";
import { usePlaceContext } from "contexts";

import { Confirm } from "./Confirm";
import FavoriteLabelForm from "./FavoriteLabelForm";

const AddToFavorites = (): JSX.Element | null => {
  const {
    place: { type, place, label, isFromFavorites },
  } = usePlaceContext();
  const { t } = useTranslation();
  const { Favorites } = useFavorites();
  const [isChecked, , setIsCheckedFalse, toggleIsChecked] = useBoolean(false);
  const [isStored, setIsStored, ,] = useBoolean(false);
  const shouldRender = useSelector((state: RootStateType) => state.isCacheSupported);

  React.useEffect(() => {
    if (isChecked && type === PlaceVariants.CITY) {
      if (Favorites.placeAlreadyStored(label)) {
        setIsCheckedFalse();
      } else {
        Favorites.add(place, {
          category: "place",
          label: place,
          source: PlaceVariants.CITY,
          place: place,
        });
        setIsStored();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  if (!shouldRender) return null;
  if (isFromFavorites) return null;
  if (Favorites.placeAlreadyStored(label)) return null;
  if (!place) return null;
  return !isStored ? (
    <>
      <Confirm handleClick={toggleIsChecked} labelText={t("page-weather.addtofavs?")} isChecked={isChecked} />

      {isChecked && type && type !== FormVariants.CITY ? (
        <FavoriteLabelForm handleFavoritesStored={setIsStored} />
      ) : null}
    </>
  ) : null;
};

export default React.memo(AddToFavorites);
