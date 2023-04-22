import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

const Project = (props) => {
    const { project, updateProject, key } = props;

    return (
        <Card key={key} className="p-3">
            <Col xxl={4}>
                <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                </label>
                <Input type="email" className="form-control" name="email" placeholder="Enter employee email" />
            </Col>
            <Col xxl={4}>
                <label htmlFor="phoneNumber" className="form-label">
                    Phone number <span className="text-danger">*</span>
                </label>
                <Input type="number" className="form-control" name="phone_number" placeholder="Enter employee phone number" />
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
                    placeholder="Select Date"
                />
            </Col>
        </Card>
    );
};

export default Project;
