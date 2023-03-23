import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Col, Button, Container, CardBody, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

const VacationCalendar = () => {
    const [employee, setEmployee] = useState({});

    const changeField = (event) => {
        let emp = { ...employee, [event.target.name]: event.target.name === 'status' ? +event.target.value : event.target.value };
        setEmployee(emp);
    };
    const sendRequestVacation = () => {};
    useEffect(() => {}, []);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Vacation Calendar</title>
                </MetaTags>
                <Container fluid>
                    <div className="card" id="Vacation">
                        <CardBody>
                            <Col xxl={6}>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Full name : Mai Công Sơn</label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Resposibility : Developer, Tester</label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-check-label">Projects : Kidsenglish, Vinmec</label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-check-label">Vacation type : </label>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" onChange={(x) => changeField(x)} />
                                            <label className="form-check-label" htmlFor="inlineRadio1">
                                                Remote
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="status" onChange={(x) => changeField(x)} />
                                            <label className="form-check-label" htmlFor="inlineRadio2">
                                                Vacation
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-check-label">Date time : </label>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio1">
                                                From
                                            </label>
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
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="inlineRadio2">
                                                To
                                            </label>
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
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-check-label">Reason : </label>
                                        <textarea type="email" className="form-control"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </form>
                            </Col>
                        </CardBody>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default VacationCalendar;
