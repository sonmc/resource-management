import React, { useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

const AddMemberModal = (props) => {
    const { isShowFormAddMember, closeFormAddMember, save } = props;
    const [employee, setEmployee] = useState({
        id: 0,
        name: '',
        email: '',
    });

    const changeField = (event) => {
        let emp = { ...employee, [event.target.name]: event.target.value };
        setEmployee(emp);
    };

    const update = () => {
        save(employee);
    };

    return (
        <Modal
            id="flipModal"
            modalClassName="flip"
            isOpen={isShowFormAddMember}
            toggle={() => {
                closeFormAddMember(false);
            }}
            centered
        >
            <ModalHeader>
                <h5 className="modal-title">Add member</h5>
            </ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row g-3">
                        <Col xxl={12}>
                            <div>
                                <label htmlFor="userName" className="form-label">
                                    Project name
                                </label>
                                <Input type="text" className="form-control" name="name" placeholder="Enter project name" onChange={(x) => changeField(x)} />
                            </div>
                        </Col>

                        <div className="col-lg-12">
                            <label className="form-label">Notes</label>
                            <textarea type="text" className="form-control" name="notes" placeholder="Enter notes" onChange={(x) => changeField(x)} />
                        </div>

                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={() => closeFormAddMember(false)}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => update()}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default AddMemberModal;
