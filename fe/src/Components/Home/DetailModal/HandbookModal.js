import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Data } from './data';
const HandbookModal = ({ status, onCloseClick }) => {
    return (
        <Modal
            size="xl"
            isOpen={status}
            toggle={() => {
                onCloseClick();
            }}
            className="modal-fullscreen"
        >
            <ModalHeader
                id="flipModal"
                toggle={() => {
                    onCloseClick();
                }}
                className="pb-3 bg-success"
            >
                Zen8labs Handbook
            </ModalHeader>
            <ModalBody>
                <div className="col-lg-12 text-content" dangerouslySetInnerHTML={{ __html: Data }}></div>
            </ModalBody>
            <div className="modal-footer">
                <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => onCloseClick()}>
                    <i className="ri-close-line me-1 align-middle"></i> Close
                </Link>
            </div>
        </Modal>
    );
};

HandbookModal.propTypes = {
    onCloseClick: PropTypes.func,
    show: PropTypes.any,
};

export default HandbookModal;
