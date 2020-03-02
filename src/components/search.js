import React, { useState, useRef } from "react";  
import { connect } from 'react-redux';
import {TextField} from '@material-ui/core';
import {useHistory } from "react-router-dom";
import {getWeather} from '../actions';

const _Search =(props)=> {

  const {onSubmit, getPath} = props;

  let [input_value, set_input_value] = useState('');
  const input = useRef(null); //prepare ref for future use
  let history = useHistory();
  const redirectNoLocation= ()=>{ history.push("/404"); }
  const redirectCities= ()=>{ //this and above function are not executed here and are send to actions
    getPath("/"+ input_value); //executes callback from App (sends local state to App)
    history.push("/" + input_value); // performs redirection
  }
  const submit = (e) => {e.preventDefault(); onSubmit(input_value, redirectNoLocation, redirectCities); };

    return (
    <div className ='search__container'>
      <form className ='search__form' onSubmit={submit} >
        <TextField required 
            ref={input} //adds ref to element
            id='city_name_input' 
            size= 'small'  
            label="Miejscowość" 
            color ="#416467" 
            variant="outlined"  
            value={input_value}// the value of the field will be taken from local state
            onChange={(e) => set_input_value(input_value = e.target.value)}
        />
        <button type = "submit" className ='submit-button'> Wyszukaj </button> 
      </form>
    </div>
          
    );
    }
  
    const mapStateToProps = (state) => ({
      city: state.currentCity,
    });
    
    const mapDispatchToProps = (dispatch) => ({
      onSubmit: (data, failureFunction, successFunction) => dispatch(getWeather(data, failureFunction, successFunction)),//here we send to actions locally defined callbacks
    });
    
const Search = connect(mapStateToProps, mapDispatchToProps)(_Search);
export default Search;  
