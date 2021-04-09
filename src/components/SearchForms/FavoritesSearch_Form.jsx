import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getWeather } from "../../js/Redux/thunks";
import { useHistory } from "react-router-dom";
import { useFormStyles } from "../details/details";
import { colors } from "../../js/fixtures";
import { MicNoneTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    backgroundColor: colors.background_grey,
    border: "4px solid " + colors.background,
    paddingBottom: "12px",
  },
  inputLabel: {
    color: "white",
    "&:active": { color: "white" },
  },
  select: {
    backgroundColor: "transparent",
    "&:before": {
      // normal
      borderBottom: "none",
      backgroundColor: "transparent",
    },
    "&:after": {
      // focused
      borderBottom: "none",
      backgroundColor: "transparent",
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: "none",
      backgroundColor: "transparent",
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  icon: {
    fill: "green",
  },
}));

const Form = props => {
  const { getWeather } = props;
  const classes = useStyles();

  const favorites = window?.Storage?.local?.getAllPlaces();

  let history = useHistory();

  const redirectCities = data => {
    switch (data.source) {
      case "city":
        history.push("/" + data.place);
        break;
      case "location":
        history.push("/" + "Latitude: " + data.place.lat + "Longitude: " + data.place.lon);
        break;
      default:
        history.push(null);
    }
  };

  const handleChange = event => {
    const input = event.target.value;
    console.log(input);
    getWeather(input.source, input.place, () => redirectCities(input));
  };

  return (
  
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>Wybierz miejsce</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className={classes.select}
          onChange={event => {
            handleChange(event);
          }}
        >
          {favorites.map(item => {
            
            return (
              <MenuItem key={item.label} value={{ source: item.source, place: item.place }}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      
    
  );
};

const mapDispatchToProps = dispatch => ({
  getWeather: (source, data, successFunction) => dispatch(getWeather(source, data, successFunction)),
});

const FavoritesSearch_Form = connect(null, mapDispatchToProps)(Form);
export default FavoritesSearch_Form;
