import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getWeather, getWeatherSimple } from "../../js/Redux/thunks";
import MyTooltip from "../details/MyTooltip";
import { useFormStyles } from "../details/details";
import NotValidated from "../details/NotValidated";
import { validateInput } from "../../js/functions";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import FindButton from '../details/FindButton';


/*const fetchWeather = (data, successFunction) => getWeather("city", data, successFunction);*/

const fetchWeather = (data, successFunction) => getWeatherSimple("city", data, successFunction);

const initialValidation = { status: false, message: "" };

const Form = props => {
  const { fetchWeather } = props;
  const classes = useFormStyles();
  let [inputValue, setInputValue] = useState("");
  let [validationStatus, setValidationStatus] = useState(initialValidation);
  let history = useHistory();

  useEffect(() => {

    const redirectCities =() => history.push("/" + inputValue);

    if (validationStatus.status) fetchWeather(inputValue, redirectCities);
  }, [validationStatus]);

  return (
    <>
      <Fade in={true} timeout={1000}>
        <form className={classes.root} autoComplete="off">
          <MyTooltip title="Nie mniej niż dwa znaki w tym jeden alfanumeryczny" arrow>
            <TextField
              required
              id="city_name_input"
              size="small"
              label="Miejscowość"
              variant="outlined"
              value={inputValue}
              onChange={e => {
                setInputValue((inputValue = e.target.value));
                setValidationStatus((validationStatus = initialValidation));
              }}
            />
          </MyTooltip>
          <FindButton
            className="submit-button"
            fn={e => {
              e.preventDefault();
              setValidationStatus((validationStatus = validateInput["city"].run(inputValue)));
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
}


//W zasadzie w Citysearchform success function bierze od razu dane które mogloby brać z data (bo data to miasto). W ten sposób uprościlibyśmy callbacka redrectCities