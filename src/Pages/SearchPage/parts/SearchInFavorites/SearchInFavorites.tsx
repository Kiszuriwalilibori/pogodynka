import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select, Paper, SelectChangeEvent } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useStyles from "./styled";

import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { useFavorites, useDispatchAction } from "hooks";
import { PlaceVariants, Position } from "types";
import { t } from "i18next";

const paperSx = { padding: "0", marginTop: "60px" };

interface eventTargetValue {
  source: PlaceVariants;
  place: Position;
}

type ChangeEvent = React.ChangeEvent<{ name?: string | undefined; value: unknown }>;

const SearchInFavorites = () => {
  const placeContext = usePlaceContext();
  const classes = useStyles();
  const { Favorites } = useFavorites();
  const { clearSearchFactory } = useDispatchAction();
  const favorites = Favorites.getAllItems();
  let navigate = useNavigate();

  const handleChange = (event: ChangeEvent) => {
    const input = event.target.value as eventTargetValue;
    const place = new Place(input.source, input.place, true);
    placeContext.setPlace(place);
    navigate(place.redirectURL, { state: { results: place.redirectURL } });
    clearSearchFactory();
  };

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
          onChange={(event: SelectChangeEvent<"">) => {
            handleChange(event as ChangeEvent);
          }}
        >
          {favorites.map(item => {
            return (
              <MenuItem
                key={item.label}
                value={
                  {
                    source: item.source,
                    place: item.place,
                  } as unknown as string | ReadonlyArray<string> | number | undefined
                }
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
