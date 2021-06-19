import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleSnackBar } from "../../js/Redux/reducers/reducer";

const MyAlert = withStyles({
  root: {
    background: "#044527",
    color: "white",
    border: "1px solid black",
    padding: '1rem',
    boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.16),0 8px 8px rgba(0,0,0,0.20);",
  },
})(Alert);

export const MessageSnackbar = props => {
  const { open, item, toggle } = props;
  const clearSnackBar = () => {
    return toggle(null, null);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={clearSnackBar}>
      <MyAlert severity="success" variant="filled">
        {item}
      </MyAlert>
    </Snackbar>
  );
};

const mapStateToProps = state => ({
  open: state.isSnackBarVisible,
  item: state.snackBarItem,
});

const mapDispatchToProps = dispatch => ({
  toggle: (value) => dispatch(toggleSnackBar(value)),
});

const UniversalSnackBar = connect(mapStateToProps, mapDispatchToProps)(MessageSnackbar);
export default UniversalSnackBar;

MessageSnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  item: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
