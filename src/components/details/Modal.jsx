import * as React from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function SimpleModal(props) {
  const { isVisible, body, details } = props;

  return (
    details?
    <div>
      <Modal open={isVisible} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" id="my-modal">
        {body(details)}
      </Modal>
    </div>:null
  );
}

const mapStateToProps = state => ({
  isVisible: state.modal.isModalVisible,
  details: state.modalDetails,
});

const MyModal = connect(mapStateToProps, null)(SimpleModal);
export default MyModal;

SimpleModal.propTypes = {
  isVisible: PropTypes.bool,
  details:PropTypes.object,
  body: PropTypes.func,
}