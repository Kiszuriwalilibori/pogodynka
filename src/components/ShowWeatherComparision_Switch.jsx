import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { toggleWeatherComparisionVisibility } from "../js/Redux/reducers/reducer";

import Core_Switch from './Core_Switch';
import { getWeatherForComparision } from "../js/Redux/thunks";


function MySwitch(props) {
  const { toggleWeatherComparisionVisibility, getWeatherForComparision } = props;

  let [check, setCheck] = useState(false);

  const toggleChecked = () => {
    setCheck(check => !check);
  };

  const toggleWeatherComparisionVisibility_Callback = useCallback(() => {
    toggleWeatherComparisionVisibility(check);
  }, [check]);

  useEffect(() => {
    check === true && getWeatherForComparision(toggleWeatherComparisionVisibility_Callback);
    check === false && toggleWeatherComparisionVisibility(check);
  }, [check]);

  return window?.Storage?.local?.hasPlaces() ? (
    
    < Core_Switch func ={toggleChecked} labelText ='Czy porównać z Ulubionymi' status = {check} />
  ) : null;
}

const mapDispatchToProps = dispatch => ({
  toggleWeatherComparisionVisibility: data => dispatch(toggleWeatherComparisionVisibility(data)),
  getWeatherForComparision: fn => dispatch(getWeatherForComparision(fn)),
});

const ShowWeatherComparision_Switch = connect(null, mapDispatchToProps)(MySwitch);
export default ShowWeatherComparision_Switch;
