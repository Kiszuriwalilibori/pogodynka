import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Fade from "@mui/material/Fade";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Radio from "./parts/Radio";
import Radios from "./parts/Radios";
import useStyles from "./Sources.styles";

import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { FormVariants, PlaceVariants, RootStateType, Source } from "types";
import { useFavorites, useDispatchAction } from "hooks";
import { TIMEOUT_SHORT } from "fixtures";

interface Props {
  currentPosition: RootStateType["geoLocationPosition"];
}
function Sources(props: Props) {
  const placeContext = usePlaceContext();
  const classes = useStyles();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { Favorites } = useFavorites();
  const { clearSearchFactory, setSearchFormSourceType } = useDispatchAction();
  const { currentPosition } = props;

  const handleChange = React.useCallback(
    event => {
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
      <FormControl component="fieldset" className={classes.sources}>
        <FormLabel className={classes.formLabel} component="legend">
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
}

const mapStateToProps = (state: RootStateType) => ({
  currentPosition: state.geoLocationPosition,
});

export default connect(mapStateToProps, {})(Sources);
