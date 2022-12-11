import React, { useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

const ConfirmDeleteModal = (props) => {
    const { isShowConfirmModal, closeConfirmDelete, confirmed } = props;

    return (
        <Modal
            id="flipModal"
            modalClassName="flip"
            isOpen={isShowConfirmModal}
            toggle={() => {
                closeConfirmDelete(false);
            }}
            centered
        >
            <ModalHeader>
                <h5 className="modal-title">Confirm Delete</h5>
            </ModalHeader>
            <ModalBody>
                <div className="row g-3">
                    <div className="col-lg-12">
                        <div className="hstack gap-2 justify-content-end">
                            <Button color="light" onClick={() => closeConfirmDelete(false)}>
                                Close
                            </Button>
                            <Button color="success" onClick={() => confirmed()}>
                                Ok
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ConfirmDeleteModal;
