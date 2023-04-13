import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

const HandbookModal = ({ status, onCloseClick }) => {
    return (
        <Modal
            size="xl"
            isOpen={status}
            toggle={() => {
                onCloseClick();
            }}
        >
            <ModalHeader
                className="modal-fullscreen"
                id="flipModal"
                toggle={() => {
                    onCloseClick();
                }}
            >
                Zen8labs Handbook
            </ModalHeader>
            <ModalBody>
                <h6 className="fs-15">Give your text a good structure</h6>
                <div className="d-flex">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                        <p className="text-muted mb-0">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible. </p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">In some designs, you might adjust your tracking to create a certain artistic effect. It can also help you fix fonts that are poorly spaced to begin with.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">
                            You've probably heard that opposites attract. The same is true for fonts. Don't be afraid to combine font styles that are different but complementary, like sans serif with serif, short with tall, or decorative with simple. Qui photo booth letterpress, commodo enim craft
                            beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
                        </p>
                    </div>
                </div>
                <div className="d-flex mt-2">
                    <div className="flex-shrink-0">
                        <i className="ri-checkbox-circle-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2 ">
                        <p className="text-muted mb-0">For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.</p>
                    </div>
                </div>
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
