import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewDetailModal = ({ objectNewDetail, onCloseClick }) => {
    const { status, data } = objectNewDetail;
    return (
        <Modal
            size="xl"
            isOpen={status}
            toggle={() => {
                onCloseClick();
            }}
        >
            <ModalHeader
                className="modal-title"
                id="flipModal"
                modalclassname="zoomIn"
                toggle={() => {
                    onCloseClick();
                }}
            >
                {data.title}
                <p className="text-muted fs-12 mb-0">
                    Posted at {moment().format('MMM DD, YYYY hh:mm A')} by {data.user?.username}
                </p>
            </ModalHeader>
            <ModalBody>
                <div
                    style={{ height: 100, overflow: 'hidden' }}
                    className="mb-1 text-content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                ></div>
            </ModalBody>
            <div className="modal-footer">
                <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => onCloseClick()}>
                    <i className="ri-close-line me-1 align-middle"></i> Close
                </Link>
            </div>
        </Modal>
    );
};

NewDetailModal.propTypes = {
    onCloseClick: PropTypes.func,
    show: PropTypes.any,
};

export default NewDetailModal;
