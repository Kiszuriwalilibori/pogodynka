import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { toggleForecastVisibility } from "../js/Redux/reducers/reducer";
import { fetchForecast } from "../js/Redux/thunks";
import Core_Switch from './Core_Switch';

function ForecastSwitch(props) {
  const { toggleForecastVisibility, fetchForecast, place } = props;

  let [check, setCheck] = useState(false);

  const toggleChecked = () => {
    setCheck(check => !check);
  };

  const toggleForecastVisibility_Callback = useCallback(() => {
    toggleForecastVisibility(true);
  }, []);

  useEffect(() => {
    check === true && fetchForecast( place.get('source'), place.get('place'), toggleForecastVisibility_Callback);
    check === false && toggleForecastVisibility(check);
  }, [check]);

  return (place.get('source')&& place.get('place'))?(
    
    < Core_Switch func ={toggleChecked} labelText ='Czy pokazać prognozę' status = {check} />
  ):null;
}
const mapStateToProps =(state)=>({place: state.place})

const mapDispatchToProps = dispatch => ({
  toggleForecastVisibility: data => dispatch(toggleForecastVisibility(data)),
  fetchForecast: (source, city,func) => dispatch(fetchForecast(source,city,func)),
});

const ShowForecast_Switch = connect(mapStateToProps, mapDispatchToProps)(ForecastSwitch);
export default ShowForecast_Switch;
