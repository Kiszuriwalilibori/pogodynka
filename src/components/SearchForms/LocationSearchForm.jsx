import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getWeather } from "../../js/actions/actions";
import Icon from "@material-ui/core/Icon";
import NotValidated from "../details/NotValidated";
import { validateInput } from "../../js/functions";
import { MyButton, useFormStyles } from "../details/details";
import MyTooltip from "../details/MyTooltip";
import Fade from '@material-ui/core/Fade';

const initialValidation = { status: false, message: "" };

const Btn = props => (
  <MyButton size="small" onClick={props.fn} endIcon={<Icon>send</Icon>} variant="contained">
    Wyszukaj
  </MyButton>
);

const Form = props => {
  const { fetchWeather, getPath } = props;
  const classes = useFormStyles();
  let [latitude, setLatitude] = useState("");
  let [longitude, setLongitude] = useState("");
  let [validationStatus, setValidationStatus] = useState(initialValidation);
  let history = useHistory();

  const redirectNoLocation = useCallback(() => {
    history.push("/404");
  }, []);

  
  const redirectCities = useCallback(() => {
    getPath("/" + "Latitude: " + latitude + "Longitude: " + longitude); //executes callback from App (sends local state to App)
    history.push("/" + "Latitude: " + latitude + "Longitude: " + longitude); // performs redirection
  }, [latitude, longitude]);

  useEffect(() => {
    if (validationStatus.status) fetchWeather({ lat: latitude, lon: longitude }, redirectNoLocation, redirectCities, "location");
  }, [validationStatus]);

  return (
    <>
       <Fade in={true} timeout ={1000}>
      <form className={classes.root} id="search__form" autocomplete="off">
        <MyTooltip title="Liczba z zakresu <-90, 90> " arrow>
          <TextField
            required
            size="small"
            variant="outlined"
            label="Latitude"
            name="Latitude_Input"
            id="Latitude"
            value={latitude}
            onChange={e => {
              setLatitude((latitude = e.target.value));
              setValidationStatus((validationStatus = initialValidation));
            }}
          />
        </MyTooltip>
        <MyTooltip title="Liczba z zakresu <-180, 180> " arrow>
          <TextField
            required
            size="small"
            variant="outlined"
            label="Longitude"
            name="Longitude_Input"
            id="Longitude"
            value={longitude}
            onChange={e => {
              setLongitude((longitude = e.target.value));
              setValidationStatus((validationStatus = initialValidation));
            }}
          />
        </MyTooltip>
        <Btn
          fn={e => {
            e.preventDefault();
            setValidationStatus((validationStatus = validateInput["location"].run({lat:latitude, lon:longitude})));
          }}
        >
          Wyszukaj
        </Btn>
      </form>
      </Fade>
      <NotValidated isValidated={validationStatus.status} message={validationStatus.message} />
    </>
  );
};

const mapStateToProps = state => ({
  city: state.currentCity,
});

const mapDispatchToProps = dispatch => ({
  fetchWeather: (data, failureFunction, successFunction, source) => dispatch(getWeather(data, failureFunction, successFunction, source)), //here we send to actions locally defined callbacks
});

const CitySearchForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default CitySearchForm;
