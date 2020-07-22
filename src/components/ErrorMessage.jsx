import React from "react"; 
import { connect } from 'react-redux';

const _ErrorMessage =(props)=> {

  const {message} = props;
  
  return (message?
    <div className= 'error-page_wrapper'>
      <h1>{message}</h1>
      <section className="error-container">
        <span>4</span>
        <span><span className="screen-reader-text">0</span></span>
        <span>4</span>
      </section>
      <br/>
    </div>:null
  );
}
 
const mapStateToProps = (state) => ({
  message: state.errorMessage, 
}
)

const ErrorMessage = connect(mapStateToProps)(_ErrorMessage);

export default ErrorMessage;
