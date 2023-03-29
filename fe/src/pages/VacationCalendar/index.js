import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Col, Row, Container, CardBody, Input, Label, Form, FormGroup } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { currentUserAtom } from '../../Recoil/states/users';
import { useRecoilValue } from 'recoil';
import { Create } from '../../Services/vacation';
import moment from 'moment';
const VacationCalendar = () => {
    const currentUser = useRecoilValue(currentUserAtom);
    const getVacationDefault = () => ({
        reason: '',
        start: '',
        end: '',
        type: 1,
        user_id: currentUser.id,
    });
    const [vacation, setVacation] = useState(getVacationDefault());
    const changeField = (event) => {
        let emp = { ...vacation, [event.target.name]: event.target.value };
        emp.type = emp.type * 1;
        console.log(emp);
        setVacation(emp);
    };

    const save = () => {
        // eslint-disable-next-line no-debugger
        Create(vacation)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
                                <Row>
                                    <Col xxl={3}>
                                        <label className="form-label">Full name :</label>
                                    </Col>
                                    <Col xxl={9}>{currentUser.full_name}</Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Resposibility :</label>
                                    </Col>
                                    <Col xxl={9}>{currentUser.roles.join(', ')}</Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Projects :</label>
                                    </Col>
                                    <Col xxl={9}></Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Vacation type :</label>
                                    </Col>
                                    <Col xxl={9}>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                onChange={(x) => changeField(x)}
                                                checked={vacation.type}
                                                value={1}
                                            />
                                            <label className="form-check-label" htmlFor="inlineRadio1">
                                                Remote
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                onChange={(x) => changeField(x)}
                                                checked={!vacation.type}
                                                value={0}
                                            />
                                            <label className="form-check-label" htmlFor="inlineRadio2">
                                                Vacation
                                            </label>
                                        </div>
                                    </Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Date time :</label>
                                    </Col>
                                    <Col xxl={9} className="d-flex">
                                        <FormGroup className="me-2">
                                            <Label for="examplePassword">From</Label>
                                            <Flatpickr
                                                className="form-control"
                                                options={{
                                                    dateFormat: 'Y-m-d',
                                                    maxDate: vacation.end,
                                                }}
                                                onChange={([value]) => {
                                                    changeField({ target: { name: 'start', value: moment(value).format('YYYY-MM-DD') } });
                                                }}
                                                value={vacation.start}
                                                placeholder="Select Date"
                                            />
                                        </FormGroup>
                                        <FormGroup className="me-2">
                                            <Label for="examplePassword">To</Label>
                                            <Flatpickr
                                                className="form-control"
                                                options={{
                                                    dateFormat: 'Y-m-d',
                                                    minDate: vacation.start,
                                                }}
                                                onChange={([value]) => {
                                                    changeField({ target: { name: 'end', value: moment(value).format('YYYY-MM-DD') } });
                                                }}
                                                value={vacation.end}
                                                placeholder="Select Date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Reason :</label>
                                    </Col>
                                    <Col xxl={9}>
                                        <textarea
                                            type="email"
                                            className="form-control"
                                            name="reason"
                                            onChange={(x) => changeField(x)}
                                            value={vacation.reason}
                                        ></textarea>
                                    </Col>
                                    <Col xxl={12}>
                                        <button className="btn btn-success" onClick={save} type="button">
                                            Submit
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </CardBody>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default VacationCalendar;
