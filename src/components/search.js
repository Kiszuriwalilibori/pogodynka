import React, { useState, useRef } from "react";  
import { connect } from 'react-redux';
import {TextField} from '@material-ui/core';
import {useHistory } from "react-router-dom";
import {getCityWeather} from '../actions';
import {styled_search} from '../styles/styles';


const _Search =(props)=> {

  const {onSubmit}= props;
  let [input_value, set_input_value] = useState('');
  const input = useRef(null);
  let history = useHistory();
  
  const redirectNoLocation= ()=>{ history.push("/404"); }
  const redirectCities= ()=>{ history.push("/City"); }
  const submit = (e) => { e.preventDefault(); onSubmit(input_value, redirectNoLocation, redirectCities); };

    return (
    <styled_search.search>
    
      <styled_search.form onSubmit={submit} >
        
        <TextField  ref={input} id='city_name_input' size= 'small'  label="Miejscowość" color ="secondary" variant="outlined"  value={input_value}
          onChange={(e) => set_input_value(input_value = e.target.value)}/>
        
        
       
        <button type = "submit"  className ='link' >Wyszukaj</button>
        
       
      </styled_search.form>
     
    </styled_search.search>
          
    );
    }
  

    const mapStateToProps = (state) => ({

      data: state.currentCityData,
      city: state.currentCity,
    });
    
    
    const mapDispatchToProps = (dispatch) => ({
    
      onSubmit: (data, failureFunction, successFunction) => dispatch(getCityWeather(data, failureFunction, successFunction)),
    });
    
    const Search = connect(mapStateToProps, mapDispatchToProps)(_Search);
    

 export default Search;  
