import * as React from "react";

import { connect } from "react-redux";

import { usePlaceContext } from "contexts";
import { renderConditionally } from "HOCs";
import { FormVariants, PlaceVariants, RootStateType } from "types";
import { useFavorites, useBoolean, useTypedSelector } from "hooks";
import { FavoriteLabelForm, SaveFavoritesButton } from "components";

interface Props {
  renderCondition: boolean;
}

const StorePlaceInFavoritesSwitch = (props: Props): JSX.Element | null => {
  const {
    place: { type, place, label, isFromFavorites },
  } = usePlaceContext();

  // const { enqueueSnackbar } = useSnackbar();
  const { Favorites } = useFavorites();
  const [check, , setCheckFalse, toggleCheck] = useBoolean(false);
  const [favoritesStored, setFavoritesStored, ,] = useBoolean(false);
  const isDataSucesfullyCollected = useTypedSelector(state => state.isShortDescriptionWithIconSet);

  React.useEffect(() => {
    if (check && type === PlaceVariants.CITY) {
      if (Favorites.placeAlreadyStored(label)) {
        setCheckFalse();
      } else {
        Favorites.add(place, {
          category: "place",
          label: place,
          source: PlaceVariants.CITY,
          place: place,
        });
        setFavoritesStored();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  if (isFromFavorites) return null;
  if (Favorites.placeAlreadyStored(label)) return null;

  return !favoritesStored && place && isDataSucesfullyCollected ? (
    <>
      <SaveFavoritesButton
        onChangeHandler={toggleCheck}
        labelText="Czy dodać to miejsce do Ulubionych?"
        isChecked={check}
      />

      {check && type && type !== FormVariants.CITY ? (
        <FavoriteLabelForm handleFavoritesStored={setFavoritesStored} />
      ) : null}
    </>
  ) : null;
};

const mapStateToProps = (state: RootStateType) => ({
  renderCondition: state.cacheSupported,
});

export default connect(mapStateToProps, null)(renderConditionally(StorePlaceInFavoritesSwitch));
