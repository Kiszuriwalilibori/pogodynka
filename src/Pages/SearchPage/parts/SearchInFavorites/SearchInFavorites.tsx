import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select, Paper, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useStyles, { paperSx } from "./SearchInFavorites.styles";

import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { useFavorites, useDispatchAction } from "hooks";
import { PlaceVariants, Position } from "types";
import { t } from "i18next";

interface eventTargetValue {
  source: PlaceVariants;
  place: Position;
}

const SearchInFavorites = () => {
  const placeContext = usePlaceContext();
  const classes = useStyles();
  let navigate = useNavigate();
  const { Favorites } = useFavorites();
  const favorites = Favorites.getAllItems();
  const { clearSearchFactory } = useDispatchAction();

  const handleChange = React.useCallback((event: SelectChangeEvent<string>) => {
    const input = JSON.parse(event.target.value) as eventTargetValue;
    const place = new Place(input.source, input.place, true);
    placeContext.setPlace(place);
    navigate(place.redirectURL, { state: { results: place.redirectURL } });
    clearSearchFactory();
  }, []);

  if (!favorites) return null;

  return (
    <Paper variant="dark" sx={paperSx}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>{t("search.select")}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          className={classes.select}
          MenuProps={{ classes: { paper: classes.dropdownStyle } }}
          value=""
          onChange={handleChange}
        >
          {favorites.map(item => {
            return (
              <MenuItem
                className="menu-item"
                key={item.label}
                value={JSON.stringify({
                  source: item.source,
                  place: item.place,
                })}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default SearchInFavorites;
