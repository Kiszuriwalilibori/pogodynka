import React, { useCallback} from "react";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { getWeather, getWeatherSimple } from "../js/Redux/thunks";
import clsx from "clsx";
import { connect } from "react-redux";
import { setSearchFormSourceType } from "../js/Redux/reducers/reducer";
import Slide from "@material-ui/core/Slide";
import useSourceSectionClasses from "./details/useSourceSectionClasses";
import PropTypes from "prop-types";

/* const fetchWeather = (data, successFunction) => getWeather("location", data, successFunction);*/
const fetchWeather = (data, successFunction) => getWeatherSimple("location", data, successFunction);



function StyledRadio(props) {
  const classes = useSourceSectionClasses();
  return <Radio className={classes.root} disableRipple color="default" checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />} icon={<span className={classes.icon} />} {...props} />;
}

function StyledRadioGroup(props) {
  const classes = useSourceSectionClasses();
  return <RadioGroup className={classes.formControlLabel} {...props} />;
}

function Section(props) {
  const classes = useSourceSectionClasses();
  let history = useHistory();
  const {setSearchFormSourceType, currentPosition, fetchWeather } = props;
  
   const redirectCities = useCallback(() => {
    history.push("/" + "Latitude: " + currentPosition.latitude + "Longitude: " + currentPosition.longitude);
  }, [currentPosition]);

  const actionHandlers = {
    city: {
      run: () => setSearchFormSourceType("city"),
    },
    location: {
      run: () => setSearchFormSourceType("location"),
    },
    favorites:{
      run: () => setSearchFormSourceType("favorites"),
    },
    current: {
      run: () => {
        fetchWeather({ lat: currentPosition.latitude, lon: currentPosition.longitude }, redirectCities);
      },
    },
  };

  const handleChange = useCallback(event => {
    const type = event.target.value;
    actionHandlers[type].run();
  });

  return (
    <Slide direction="down" timeout={500} in={true} mountOnEnter unmountOnExit>
      <FormControl component="fieldset" className={classes.area}>
        <FormLabel className={classes.formLabel} component="legend">
          Pokaż pogodę dla:
        </FormLabel>
        <StyledRadioGroup row defaultValue="female" aria-label="source" name="customized-radios" onChange={handleChange}>
          <FormControlLabel value="city" control={<StyledRadio />} label="miasta" />
          <FormControlLabel value="current" disabled={!currentPosition} control={<StyledRadio />} label="aktualnej lokalizacji" />
          <FormControlLabel value="location" control={<StyledRadio />} label="innej lokalizacji" />
          <FormControlLabel value="favorites" disabled={!window?.Storage?.local?.hasPlaces()} control={<StyledRadio />} label="z Ulubionych" />
        </StyledRadioGroup>
      </FormControl>
    </Slide>
  );
}

const mapStateToProps = state => ({
  currentPosition: state.geoLocationPosition,
  weatherAvailable: state.weatherAvailable,
});

const mapDispatchToProps = dispatch => ({
  setSearchFormSourceType: x => dispatch(setSearchFormSourceType(x)),
  fetchWeather: (data, successFunction) => dispatch(fetchWeather(data, successFunction)),
});

const SourceSection = connect(mapStateToProps, mapDispatchToProps)(Section);
export default SourceSection;

Section.propTypes = {
  favoritesNotEmpty: PropTypes.bool,
  setSearchFormSourceType: PropTypes.func,
  currentPosition: PropTypes.object,
  fetchWeather: PropTypes.func,
};
