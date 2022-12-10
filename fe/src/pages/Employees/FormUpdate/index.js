import React, { useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

const EMPLOYEE_DEFAULT = {
    roleId: 0,
    dob: '2000-01-01',
    name: '',
    email: '',
    phoneNumber: '',
    status: 0,
    avatar: '',
    gender: false,
    createdAt: '',
    updatedAt: '',
};

const ModalUpdate = (props) => {
    const { isShowFormUpdate, closeFormUpdate, save, titleForm } = props;
    const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT);

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
            isOpen={isShowFormUpdate}
            toggle={() => {
                closeFormUpdate(false);
            }}
            centered
        >
            <ModalHeader>
                <h5 className="modal-title">{titleForm}</h5>
            </ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row g-3">
                        <Col xxl={6}>
                            <div>
                                <label htmlFor="name" className="form-label">
                                    UserName
                                </label>
                                <Input value={employee.name} type="text" className="form-control" name="name" placeholder="Enter employee username" onChange={(x) => changeField(x)} />
                            </div>
                        </Col>
                        <Col xxl={6}>
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <Input value={employee.email} type="email" className="form-control" name="email" placeholder="Enter employee email" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={6}>
                            <label htmlFor="dob" className="form-label">
                                Date of birth
                            </label>
                            <Input value={employee.dob} type="date" className="form-control" name="dob" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={6}>
                            <label htmlFor="dob" className="form-label">
                                Role
                            </label>
                            <select className="form-control" name="role" onChange={(x) => changeField(x)}>
                                <option value={1}>Admin</option>
                                <option value={2}>Project Manager</option>
                            </select>
                        </Col>
                        <Col xxl={6}>
                            <label htmlFor="phoneNumber" className="form-label">
                                Phone number
                            </label>
                            <Input value={employee.phoneNumber} type="number" className="form-control" name="phoneNumber" placeholder="Enter employee phone number" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={6}>
                            <label htmlFor="phoneNumber" className="form-label">
                                Status
                            </label>
                            <select className="form-control" name="status" onChange={(x) => changeField(x)}>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </Col>
                        <div className="col-lg-12">
                            <label className="form-label">Gender</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <Input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="1" onChange={(x) => changeField(x)} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="0" onChange={(x) => changeField(x)} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={() => closeFormUpdate(false)}>
                                    Close
                                </Button>
                                <Button color="success" onClick={() => update()}>
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

export default ModalUpdate;
