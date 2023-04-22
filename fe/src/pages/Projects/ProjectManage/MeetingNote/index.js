import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { useState } from 'react';

const MeetingNote = () => {
    const [meetingNotes, setMeetingNotes] = useState([]);
    return (
        <React.Fragment>
            <Row>
                <Col xl={12} lg={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Meeting Notes</h4>
                        </CardHeader>

                        <CardBody>
                            <div className="table-responsive mt-3">
                                <Table className="table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 5 }}>No.</th>
                                            <th>Title</th>
                                            <th>Content</th>
                                            <th>Date Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {meetingNotes.map((emp, key) => {
                                            return (
                                                <tr key={key}>
                                                    <th>{key + 1}</th>

                                                    <td>{emp.email}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                            <form className="mt-4">
                                <Row className="g-3">
                                    <Col xs={12}>
                                        <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows="3" placeholder="Enter your notes..."></textarea>
                                    </Col>
                                    <Col xs={12} className="text-end">
                                        <button type="button" className="btn btn-ghost-secondary btn-icon waves-effect me-1">
                                            <i className="ri-attachment-line fs-16"></i>
                                        </button>
                                        <Link to="#" className="btn btn-success">
                                            Post Comments
                                        </Link>
                                    </Col>
                                </Row>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default MeetingNote;
