import React from "react";
import { connect } from "react-redux";

const article = props => {
  const { isLoading } = props;

  return isLoading ? <article className="loading">Loading&#8230;</article> : null;
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const Loader = connect(mapStateToProps, null)(article);

export default Loader;
