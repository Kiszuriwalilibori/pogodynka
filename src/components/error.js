import React from "react"; 
import { connect } from 'react-redux';
import {LinkToTarget, LinkToCities} from "../utils/links";

  const _error =(props)=> {

    const {message} = props;
    return (
    
    <div className= 'error-page_wrapper'>
    <h1>{message}</h1>
    
    <section className="error-container">
      <span>4</span>
      <span><span className="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
    {LinkToTarget}
    <br/>
    {LinkToCities}
    </div>
    
    );
    }
 
    
    const mapStateToProps = (state) => ({
      message: state.errorMessage,
      
    })
    
    const Error = connect(mapStateToProps)(_error);

    export default Error;
