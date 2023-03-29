import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Col, Row, Container, CardBody, Label, FormGroup } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { currentUserState } from '../../Recoil/states/users';
import { useRecoilValue } from 'recoil';
import { Create } from '../../Services/vacation';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../Constant';
import 'react-toastify/dist/ReactToastify.css';

const VacationCalendarPage = () => {
    const currentUser = useRecoilValue(currentUserState);
    const getVacationDefault = () => ({
        reason: '',
        start: '',
        end: '',
        type: 1,
        user_id: currentUser.user_id,
    });
    const [vacation, setVacation] = useState(getVacationDefault());
    const changeField = (event) => {
        let emp = { ...vacation, [event.target.name]: event.target.value };
        emp.type = emp.type * 1;
        setVacation(emp);
    };

    const save = () => {
        Create(vacation)
            .then((res) => {
                const vacation = getVacationDefault();
                setVacation(vacation);
                toast.success('successfully !', TOAST_CONFIG);
            })
            .catch((error) => {
                toast.error('Error !', error);
            });
    };

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
                                            <input className="form-check-input" type="radio" name="type" onChange={(x) => changeField(x)} checked={vacation.type} value={1} />
                                            <label className="form-check-label" htmlFor="inlineRadio1">
                                                Remote
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="type" onChange={(x) => changeField(x)} checked={!vacation.type} value={0} />
                                            <label className="form-check-label" htmlFor="inlineRadio2">
                                                Vacation
                                            </label>
                                        </div>
                                    </Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Date time :</label>
                                    </Col>
                                    <Col xxl={9} className="d-flex">
                                        <FormGroup className="me-3 d-flex align-items-center">
                                            <Label for="examplePassword" className="me-2">
                                                From
                                            </Label>
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
                                                placeholder="Select start date"
                                            />
                                        </FormGroup>
                                        <FormGroup className="d-flex align-items-center">
                                            <Label for="examplePassword" className="me-2">
                                                To
                                            </Label>
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
                                                placeholder="Select end date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xxl={3}>
                                        <label className="form-label">Reason :</label>
                                    </Col>
                                    <Col xxl={6}>
                                        <textarea type="email" className="form-control" style={{ height: '150px' }} name="reason" onChange={(x) => changeField(x)} value={vacation.reason}></textarea>
                                    </Col>
                                    <Col xxl={12} className="mt-2">
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
            <ToastContainer />
        </React.Fragment>
    );
};

export default VacationCalendarPage;
