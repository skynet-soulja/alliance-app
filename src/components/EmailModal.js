import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/Modal.css';

export default function EmailModal({ children, show, handleClose, handleSubmit }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Preview Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(event) => {
                            handleSubmit(event);
                            handleClose();
                        }}
                    >
                        Send Email
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
