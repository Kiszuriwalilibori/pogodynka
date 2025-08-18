import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Fade from "@mui/material/Fade";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { FormVariants, PlaceVariants, RootStateType, Source } from "types";
import { useFavorites, useDispatchAction } from "hooks";
import { TIMEOUT_SHORT } from "fixtures";

import Radio from "./parts/Radio";
import Radios from "./parts/Radios";
import { formLabelSx, sourcesSx } from "./Sources.styles";
import { SelectChangeEvent } from "@mui/material/Select";

const Sources = () => {
  const placeContext = usePlaceContext();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { Favorites } = useFavorites();
  const { clearSearchFactory, setSearchFormSourceType } = useDispatchAction();
  const currentPosition = useSelector((state: RootStateType) => state.geoLocationPosition);

  const handleChange = React.useCallback(
    (event: SelectChangeEvent<Source>) => {
      const actionHandlers: {
        [key in Source]: { [key: string]: () => void };
      } = {
        city: {
          run: () => setSearchFormSourceType(FormVariants.CITY),
        },
        location: {
          run: () => setSearchFormSourceType(FormVariants.LOCATION),
        },
        favorites: {
          run: () => setSearchFormSourceType(FormVariants.FAVORITES),
        },
        current: {
          run: () => {
            if (currentPosition) {
              const place = new Place(PlaceVariants.LOCATION, {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
              });

              placeContext.setPlace(place);
              console.log("SearchBySoureces",place.redirectURL);
              navigate(place.redirectURL, { state: { results: place.redirectURL } });
              setSearchFormSourceType(FormVariants.LOCATION);
              clearSearchFactory();
            }
          },
        },
      };

      const type = event.target.value as Source;
      actionHandlers[type].run();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [currentPosition]
  );

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT} id="Sources">
      <FormControl component="fieldset" sx={sourcesSx}>
        <FormLabel sx={formLabelSx} component="legend">
          {t("search.show_for")}
        </FormLabel>
        <Radios row defaultValue="" aria-label="source" name="customized-radios" onChange={handleChange}>
          <FormControlLabel value="city" control={<Radio />} label={t("search.city")} />
          <FormControlLabel
            value="current"
            disabled={!currentPosition}
            control={<Radio />}
            label={t("search.current")}
          />
          <FormControlLabel value="location" control={<Radio />} label={t("search.other")} />
          <FormControlLabel
            value="favorites"
            disabled={!Favorites.hasContent()}
            control={<Radio />}
            label={t("search.favorites")}
          />
        </Radios>
      </FormControl>
    </Fade>
  );
};

export default Sources;
