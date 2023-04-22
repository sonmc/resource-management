import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { GENDER_MALE, GENDER_FEMALE } from '../../../../Constant/index';

const PersonalInformation = (props) => {
    const { personalInformation, updatePersonalInfomation, key } = props;

    const changeField = (event) => {
        let per = { ...personalInformation, [event.target.name]: event.target.name == 'status' ? +event.target.value : event.target.value };
        updatePersonalInfomation(per);
    };

    return (
        <Card key={key} className="p-3">
            <div className="row g-4 personal-information">
                <Col xxl={4}>
                    <div>
                        <label htmlFor="name" className="form-label">
                            Full name <span className="text-danger">*</span>
                        </label>
                        <Input value={personalInformation.username} type="text" className="form-control" name="username" placeholder="Enter employee username" onChange={(x) => changeField(x)} />
                    </div>
                </Col>
                <Col xxl={4}>
                    <div>
                        <label htmlFor="name" className="form-label">
                            Position <span className="text-danger">*</span>
                        </label>
                        <Input value={personalInformation.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                    </div>
                </Col>
                <Col xxl={4}>
                    <label className="form-label me-3">
                        Gender <span className="text-danger">*</span>
                    </label>
                    <div className="mt-2">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" checked={personalInformation.gender == GENDER_MALE} value={GENDER_MALE} onChange={(x) => changeField(x)} />
                            <label className="form-check-label" htmlFor="inlineRadio1">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" checked={personalInformation.gender == GENDER_FEMALE} value={GENDER_FEMALE} onChange={(x) => changeField(x)} />
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
                    <Input value={personalInformation.email} type="email" className="form-control" name="email" placeholder="Enter employee email" onChange={(x) => changeField(x)} />
                </Col>
                <Col xxl={4}>
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone number <span className="text-danger">*</span>
                    </label>
                    <Input value={personalInformation.phone_number} type="number" className="form-control" name="phone_number" placeholder="Enter employee phone number" onChange={(x) => changeField(x)} />
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
                        value={personalInformation.dob}
                        placeholder="Select Date"
                    />
                </Col>
                <Col xxl={12}>
                    <label htmlFor="dob" className="form-label">
                        Address <span className="text-danger">*</span>
                    </label>
                    <Input value={personalInformation.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => changeField(x)} />
                </Col>
                <Col xxl={12}>
                    <label htmlFor="dob" className="form-label">
                        Introduce
                    </label>
                    <textarea className="form-control"></textarea>
                </Col>
            </div>
        </Card>
    );
};

export default PersonalInformation;
