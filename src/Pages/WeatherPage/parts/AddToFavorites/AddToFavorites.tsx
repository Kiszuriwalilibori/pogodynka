import * as React from "react";

import { connect } from "react-redux";

import { usePlaceContext } from "contexts";
import { renderConditionally } from "HOCs";
import { FormVariants, PlaceVariants, RootStateType } from "types";
import { useFavorites, useBoolean } from "hooks";
import FavoriteLabelForm from "./FavoriteLabelForm";
import { Confirm } from "./Confirm";
import { useTranslation } from "react-i18next";

interface Props {
  shouldRender: boolean;
}

const AddToFavorites = (props: Props): JSX.Element | null => {
  const {
    place: { type, place, label, isFromFavorites },
  } = usePlaceContext();
  const { t } = useTranslation();
  const { Favorites } = useFavorites();
  const [isChecked, , setIsCheckedFalse, toggleIsChecked] = useBoolean(false);
  const [isStored, setIsStored, ,] = useBoolean(false);

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

const mapStateToProps = (state: RootStateType) => ({
  shouldRender: state.cacheSupported,
});

export default connect(mapStateToProps, null)(renderConditionally(AddToFavorites));
