import * as React from "react";
import PropTypes from "prop-types";


const NotValidated = props => {
  const { isValidated, message } = props;
  return !isValidated && message ? (
    <article className="not-validated">
      <p>{"Nie zwalidowano. " + message}</p>
    </article>
  ) : null;
};

export default NotValidated;

NotValidated.propTypes = {
  isValidated: PropTypes.bool, 
  message: PropTypes.string, 
};
