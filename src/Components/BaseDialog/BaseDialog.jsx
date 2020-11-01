import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function BaseDialog(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>No answer given!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please click on an answer to proceed to the next question.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
