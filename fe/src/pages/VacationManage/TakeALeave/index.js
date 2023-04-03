import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Row, Label, FormGroup } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';

const TakeALeave = (props) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const getVacationDefault = () => ({
        reason: '',
        start: '',
        end: '',
        type: 1,
        user_id: currentUser.user_id,
    });
    const { showFormCreate, closeFormCreate, createVacation } = props;
    const [vacation, setVacation] = useState(getVacationDefault());
    const changeField = (event) => {
        let emp = { ...vacation, [event.target.name]: event.target.value };
        emp.type = emp.type * 1;
        setVacation(emp);
    };

    return (
        <Modal
            id="flipModal"
            size="lg"
            modalClassName="flip"
            isOpen={showFormCreate}
            toggle={() => {
                closeFormCreate(false);
            }}
            centered
        >
            <ModalHeader className="p-3 bg-soft-info">Take a leave</ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row g-4">
                        <Row className="mt-3">
                            <Col xxl={3}>
                                <label className="form-label">Full name :</label>
                            </Col>
                            <Col xxl={9}>{currentUser.full_name}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xxl={3}>
                                <label className="form-label">Resposibility :</label>
                            </Col>
                            <Col xxl={9}>{currentUser.roles.join(', ')}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xxl={3}>
                                <label className="form-label">Projects :</label>
                            </Col>
                            <Col xxl={9}>{currentUser.projects.join(', ')}</Col>
                        </Row>
                        <Row className="mt-3">
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
                        </Row>
                        <Row className="mt-3">
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
                        </Row>
                        <Row className="mt-3">
                            <Col xxl={3}>
                                <label className="form-label">Reason :</label>
                            </Col>
                            <Col xxl={9}>
                                <textarea type="email" className="form-control" style={{ height: '150px' }} name="reason" onChange={(x) => changeField(x)} value={vacation.reason}></textarea>
                            </Col>
                        </Row>

                        <Col xxl={12}>
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={() => closeFormCreate(false)}>
                                    Close
                                </Button>
                                <Button color="success" onClick={() => createVacation()}>
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default TakeALeave;
