import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
import { Get } from '../../../Services/user.service';

const EMPLOYEE_DEFAULT = {
    roleId: 2,
    dob: '2000-01-01',
    name: '',
    email: '',
    phoneNumber: '',
    status: 1,
    avatar: '',
    gender: false,
};

const ModalUpdate = (props) => {
    const { isShowFormUpdate, closeFormUpdate, save, employeeId, roles } = props;
    const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT);
    const [title, setTitle] = useState('Create employee');
    const changeField = (event) => {
        let emp = { ...employee, [event.target.name]: event.target.value };
        setEmployee(emp);
    };

    const update = () => {
        save(employee);
    };

    useEffect(() => {
        if (employeeId) {
            const params = { id: employeeId };
            Get(params).then((res) => {
                if (res.length === 1) setEmployee(res[0]);
            });
            setTitle('Update employee');
        } else {
            setEmployee({ ...EMPLOYEE_DEFAULT });
        }
    }, [employeeId]);
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
                <Label className="modal-title">{title}</Label>
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
                            <select value={employee.roleId} className="form-control" name="roleId" onChange={(x) => changeField(x)}>
                                {roles.map((role, key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            <option value={role.id}>{role.name}</option>
                                        </React.Fragment>
                                    );
                                })}
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
                            <select value={employee.status} className="form-control" name="status" onChange={(x) => changeField(x)}>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </Col>
                        <div className="col-lg-12">
                            <label className="form-label">Gender</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <Input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="true" onChange={(x) => changeField(x)} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="false" onChange={(x) => changeField(x)} />
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
