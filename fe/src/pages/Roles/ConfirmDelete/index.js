import React from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';

const ConfirmDelete = (props) => {
    const { isShowConfirmDelete, closeConfirmDelete, deleteRole, roleId } = props;

    const remote = () => {
        deleteRole(roleId);
    };

    return (
        <Modal
            id="flipModal"
            modalClassName="flip"
            isOpen={isShowConfirmDelete}
            toggle={() => {
                closeConfirmDelete(false);
            }}
            centered
        >
            <ModalHeader>
                <Label className="modal-title">Confirm delete</Label>
            </ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row g-3">
                        <Col xxl={12}>
                            <h5>Are you sure you want to delete this role ?</h5>
                        </Col>

                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={() => closeConfirmDelete(false)}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={() => remote()}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default ConfirmDelete;
