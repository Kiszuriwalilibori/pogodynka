import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

import MyTooltip from "../details/MyTooltip";
import { useFormStyles } from "../details/details";
import NotValidated from "../details/NotValidated";
import { validateInput } from "../../js/functions";
import {createCurrentLocationLabel} from '../../js/Redux/reducers/reducer';
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import FindButton from '../details/FindButton';

const initialValidation = { status: false, message: "" };

const Form = props => {
  const { createCurrentLocationLabel } = props;
  const classes = useFormStyles();
  let [inputValue, setInputValue] = useState("");
  let [validationStatus, setValidationStatus] = useState(initialValidation);
  
  useEffect(() => {
    if (validationStatus.status) createCurrentLocationLabel(inputValue);//tu ma być callback od switcha
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
              label="Etykieta"
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
            Zatwierdź
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
  createCurrentLocationLabel: (data) => dispatch(createCurrentLocationLabel(data)),
});

const Label_Form = connect(mapStateToProps, mapDispatchToProps)(Form);
export default Label_Form;


Form.propTypes = {
  createLabel: PropTypes.func, 
}
