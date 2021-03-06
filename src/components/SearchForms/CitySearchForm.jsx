import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getWeather} from "../../js/actions/actions";
import MyTooltip from "../details/MyTooltip";
import { MyButton, useFormStyles } from "../details/details";
import NotValidated from "../details/NotValidated";
import { validateInput } from "../../js/functions";
import Icon from "@material-ui/core/Icon";
import Fade from '@material-ui/core/Fade';

const initialValidation = { status: false, message: "" };

const Btn = props => (
  
  <MyButton size="small" onClick={props.fn} endIcon={<Icon>send</Icon>} variant="contained">
    Wyszukaj
  </MyButton>
);

const Form = props => {
  
  const { fetchWeather } = props;
  const classes = useFormStyles();
  let [inputValue, setInputValue] = useState("");
  let [validationStatus, setValidationStatus] = useState(initialValidation);
  let history = useHistory();

  const redirectNoLocation = useCallback(() => {
    history.push("/404");
  }, []);

  const redirectCities = useCallback(() => {
    history.push("/" + inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (validationStatus.status) fetchWeather(inputValue, redirectNoLocation, redirectCities, "city");
  }, [validationStatus]);

  return (
    <>
    <Fade in={true} timeout ={1000}>
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
        <Btn
          className="submit-button"
          fn={e => {
            e.preventDefault();
            setValidationStatus((validationStatus = validateInput["city"].run(inputValue)));
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
  fetchWeather: (data, failureFunction, successFunction, source) => dispatch(getWeather(data, failureFunction, successFunction, source)), 
});

const CitySearchForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default CitySearchForm;
