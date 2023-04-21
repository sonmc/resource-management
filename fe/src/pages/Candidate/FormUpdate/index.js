import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
import { Get } from 'src/Services/user.service';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { GENDER_MALE, GENDER_FEMALE } from '../../../Constant/index';
import { Get as GetEmployee } from 'src/Services/user.service';
import { LEVEL_STATUS } from '../../../Constant';
import Education from './Education';

const EMPLOYEE_DEFAULT = {
    role_id: 0,
    dob: '2000-01-01',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    status: 1,
    status_level: 1,
    chapter_head: null,
    onboarding: new Date(),
    avatar: '',
    gender: 1,
};
const levelStatus = LEVEL_STATUS;

const ModalUpdate = (props) => {
    const { isShowFormUpdate, closeFormUpdate, save, candidateId, roles } = props;
    const [selectedStatus, setSelectedStatus] = useState(levelStatus[0]);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT);
    const [title, setTitle] = useState('Create candidate');
    const [selectedRoles, setRoles] = useState(null);
    const [selectedChapterHead, setSelectedChapterHead] = useState(null);

    const changeField = (event) => {
        let emp = { ...employee, [event.target.name]: event.target.name == 'status' ? +event.target.value : event.target.value };
        setEmployee(emp);
    };

    const update = () => {
        employee.gender = employee.gender == 1;
        save(employee, candidateId ? 'UPDATE' : 'CREATE');
    };

    const handleMultiRole = (selectedRoles) => {
        setRoles(selectedRoles);
    };

    const handleChapterHead = (chapterHead) => {
        setSelectedChapterHead(chapterHead);
    };
    const fetchEmployee = (filter) => {
        GetEmployee(filter).then((res) => {
            setEmployees(res);
        });
    };

    const handleLevelStatus = (st) => {
        setSelectedStatus(st);
    };
    useEffect(() => {
        let emp = { ...employee, roles: selectedRoles, status_level: selectedStatus?.id, chapter_head: selectedChapterHead?.id };
        setEmployee(emp);
    }, [selectedRoles, selectedStatus, selectedChapterHead]);

    useEffect(() => {
        if (candidateId) {
            const params = { id: candidateId };
            Get(params).then((res) => {
                setEmployee(res);
            });
            setTitle('Update candidate');
        } else {
            // setEmployee({ ...employee, role_id: roles.length > 0 ? roles[0].id : 0 });
        }
    }, [candidateId]);

    useEffect(() => {
        fetchEmployee({
            searchTerm: '',
            roleId: 0,
            status: 0,
        });
    }, []);

    return (
        <Modal
            id="flipModal"
            size="lg"
            modalclassname="flip"
            isOpen={isShowFormUpdate}
            toggle={() => {
                closeFormUpdate(false);
            }}
            centered
        >
            <ModalHeader className="p-3 bg-soft-info">{title}</ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row">
                        <h4 className="pb-2"> Personal information</h4>
                    </div>
                    <div className="row g-4 personal-information">
                        <Col xxl={4}>
                            <div>
                                <label htmlFor="name" className="form-label">
                                    Full name <span className="text-danger">*</span>
                                </label>
                                <Input value={employee.username} type="text" className="form-control" name="username" placeholder="Enter employee username" onChange={(x) => changeField(x)} />
                            </div>
                        </Col>
                        <Col xxl={4}>
                            <div>
                                <label htmlFor="name" className="form-label">
                                    Position <span className="text-danger">*</span>
                                </label>
                                <Input value={employee.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                            </div>
                        </Col>
                        <Col xxl={4}>
                            <label className="form-label me-3">
                                Gender <span className="text-danger">*</span>
                            </label>
                            <div className="mt-2">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" checked={employee.gender == GENDER_MALE} value={GENDER_MALE} onChange={(x) => changeField(x)} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" checked={employee.gender == GENDER_FEMALE} value={GENDER_FEMALE} onChange={(x) => changeField(x)} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={4}>
                            <label htmlFor="email" className="form-label">
                                Email <span className="text-danger">*</span>
                            </label>
                            <Input value={employee.email} type="email" className="form-control" name="email" placeholder="Enter employee email" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={4}>
                            <label htmlFor="phoneNumber" className="form-label">
                                Phone number <span className="text-danger">*</span>
                            </label>
                            <Input value={employee.phone_number} type="number" className="form-control" name="phone_number" placeholder="Enter employee phone number" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={4}>
                            <Label for="start-field" className="form-label">
                                Date of birth <span className="text-danger">*</span>
                            </Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: 'Y-m-d',
                                }}
                                onChange={([value]) => {
                                    changeField({ target: { name: 'dob', value } });
                                }}
                                value={employee.dob}
                                placeholder="Select Date"
                            />
                        </Col>
                        <Col xxl={12}>
                            <label htmlFor="dob" className="form-label">
                                Address <span className="text-danger">*</span>
                            </label>
                            <Input value={employee.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={12}>
                            <label htmlFor="dob" className="form-label">
                                Introduce
                            </label>
                            <textarea className="form-control"></textarea>
                        </Col>
                    </div>
                    <div className="row mt-3">
                        <h4 className="pb-2"> Educations</h4>
                    </div>
                    <div className="row g-4">
                        <Education />
                        <Col xxl={12}>
                            <button type="button" className="w-25 btn btn-outline-secondary waves-effect waves-light">
                                Add
                            </button>
                        </Col>
                    </div>

                    <div className="row mt-3">
                        <h4 className="pb-2">Work Experience</h4>
                    </div>
                    <div className="row g-4">
                        <Col xxl={6}>
                            <button type="button" className="w-50 btn btn-outline-secondary waves-effect waves-light">
                                Add
                            </button>
                        </Col>
                    </div>
                    <div className="row mt-3">
                        <h4 className="pb-2"> Projects</h4>
                    </div>
                    <div className="row g-4">
                        <Col xxl={6}>
                            <button type="button" className="w-50 btn btn-outline-secondary waves-effect waves-light">
                                Add
                            </button>
                        </Col>
                    </div>
                    <div className="row mt-3">
                        <h4 className="pb-2"> Skills</h4>
                    </div>
                    <div className="row g-4">
                        <Col xxl={12}>
                            <label htmlFor="dob" className="form-label">
                                Technical Abilities
                            </label>
                            <Input value={employee.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={12}>
                            <label htmlFor="dob" className="form-label">
                                Languages
                            </label>
                            <Input value={employee.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                        </Col>
                        <Col xxl={12}>
                            <label htmlFor="dob" className="form-label">
                                Work Method
                            </label>
                            <Input value={employee.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                        </Col>
                    </div>
                    <div className="row g-4 md-footer mt-3">
                        <Col xxl={12}>
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={() => closeFormUpdate(false)}>
                                    Close
                                </Button>
                                <Button color="success" onClick={() => update()}>
                                    Save
                                </Button>
                            </div>
                        </Col>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default ModalUpdate;
