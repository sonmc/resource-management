import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col } from 'reactstrap';

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
            <ModalHeader className="p-3 bg-soft-info">Are you sure you want to remove this member ?</ModalHeader>
            <ModalBody>
                <div className="row g-3">
                    <Col lg={12}>
                        <div className="hstack gap-2 justify-content-end">
                            <Button color="light" onClick={() => closeConfirmDelete(false)}>
                                Close
                            </Button>
                            <Button color="danger" onClick={() => confirmed()}>
                                Ok
                            </Button>
                        </div>
                    </Col>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default ConfirmDeleteModal;
