import { CONFIRM_TYPE } from 'src/Constant';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const ConfirmModal = ({ data, onConfirmClick, onCloseClick }) => {
    let { title = 'Are you sure ?', message = ' Are you sure you want to remove this record ?', typeConfirm, isOpen, value } = data;
    const onConfirm = () => onConfirmClick(value);
    return (
        <Modal isOpen={isOpen} toggle={onCloseClick} centered={true}>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <lord-icon
                        src="https://cdn.lordicon.com/gsqxdxog.json"
                        trigger="loop"
                        colors="primary:#f7b84b,secondary:#f06548"
                        style={{ width: '100px', height: '100px' }}
                    ></lord-icon>
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>{title}</h4>
                        <p className="text-muted mx-4 mb-0">{message}</p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal" onClick={onCloseClick}>
                        Close
                    </button>
                    <ButtonConfirm typeConfirm={typeConfirm} onConfirmClick={onConfirm} />
                </div>
            </ModalBody>
        </Modal>
    );
};
const ButtonConfirm = ({ typeConfirm, onConfirmClick }) => {
    switch (typeConfirm) {
        case CONFIRM_TYPE.CONFIRM:
            return (
                <button type="button" className="btn w-sm btn-primary " onClick={onConfirmClick}>
                    Yes
                </button>
            );
        case CONFIRM_TYPE.DELETE:
            return (
                <button type="button" className="btn w-sm btn-danger " onClick={onConfirmClick}>
                    Delete
                </button>
            );
        default:
            return '';
    }
};
export default ConfirmModal;
