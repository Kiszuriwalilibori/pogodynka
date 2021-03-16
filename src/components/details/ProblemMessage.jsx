import React, { useCallback } from "react";
import { connect } from "react-redux";
import { hideErrorMessage } from "../../js/Redux/reducers/reducer";
import Fade from "@material-ui/core/Fade";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";

const cancel_icon_style = {
  cursor: "pointer",
};
const center = {
  margin: "0 auto",
};

const Message = props => {
  const { errorMessage, isError, hideErrorMessage } = props;

  const handleClose = useCallback(() => hideErrorMessage());
  return isError ? (
    <Fade in={true} timeout={300} style={center}>
      <article className="not-validated">
        <CancelIcon onClick={handleClose} style={cancel_icon_style} />
        <hr></hr>
        <p>Wystąpił błąd:</p>
        <p>{errorMessage}</p>
      </article>
    </Fade>
  ) : null;
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  isError: state.isError,
});

const mapDispatchToProps = dispatch => ({
  hideErrorMessage: () => {
    dispatch(hideErrorMessage());
  },
});

const ProblemMessage = connect(mapStateToProps, mapDispatchToProps)(Message);
export default ProblemMessage;

Message.propTypes = {
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  hideErrorMessage: PropTypes.func,
};
