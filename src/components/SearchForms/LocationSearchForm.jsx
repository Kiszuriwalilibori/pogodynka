import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getWeather } from "../../js/actions/actions";
import NotValidated from "../details/NotValidated";
import { validateInput } from "../../js/functions";
import { useFormStyles } from "../details/details";
import MyTooltip from "../details/MyTooltip";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import FindButton from "../details/FindButton";

const fetchWeather = (data, successFunction) => getWeather("location", data, successFunction);
const initialValidation = { status: false, message: "" };

const Form = props => {
  const { fetchWeather } = props;
  const classes = useFormStyles();
  let [latitude, setLatitude] = useState("");
  let [longitude, setLongitude] = useState("");
  let [validationStatus, setValidationStatus] = useState(initialValidation);
  let history = useHistory();

  useEffect(() => {
    
    const redirectCities = () => history.push("/" + "Latitude: " + latitude + "Longitude: " + longitude);

    if (validationStatus.status) fetchWeather({ lat: latitude, lon: longitude }, redirectCities);
  }, [validationStatus]);

  return (
    <>
      <Fade in={true} timeout={1000}>
        <form className={classes.root} id="search__form" autoComplete="off">
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
          <FindButton
            fn={e => {
              e.preventDefault();
              setValidationStatus((validationStatus = validateInput["location"].run({ lat: latitude, lon: longitude })));
            }}
          >
            Wyszukaj
          </FindButton>
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
  fetchWeather: (data, successFunction) => dispatch(fetchWeather(data, successFunction)),
});

const CitySearchForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default CitySearchForm;

Form.propTypes = {
  fetchWeather: PropTypes.func,
};
