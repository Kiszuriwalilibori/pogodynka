import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select, Paper, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { formControlSx, inputLabelSx, menuProps, selectSx, paperSx } from "./SearchInFavorites.styles";
import * as ROUTES from "routes";
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
  const navigate = useNavigate();
  const { Favorites } = useFavorites();
  const favorites = Favorites.getAllItems();
  const { clearSearchFactory } = useDispatchAction();

  const handleChange = React.useCallback(
    (event: SelectChangeEvent<string>) => {
      const input = JSON.parse(event.target.value) as eventTargetValue;
      const place = new Place(input.source, input.place, true);
      placeContext.setPlace(place);
      
      navigate(ROUTES.WEATHER + place.redirectURL, { state: { results: place.redirectURL } });
      clearSearchFactory();
    },
    [navigate, placeContext, clearSearchFactory]
  );

  if (!favorites) return null;

  return (
    <Paper variant="dark" sx={paperSx}>
      <FormControl sx={formControlSx}>
        <InputLabel sx={inputLabelSx} disableAnimation>
          {t("search.select")}
        </InputLabel>

        <Select
          labelId="simple-select-label"
          id="simple-select"
          sx={selectSx}
          MenuProps={menuProps}
          value=""
          onChange={handleChange}
        >
          {favorites.map(item => (
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
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default SearchInFavorites;
