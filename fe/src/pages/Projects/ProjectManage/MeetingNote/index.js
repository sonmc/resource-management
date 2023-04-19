import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';

//import images
import avatar8 from '../../../../assets/images/users/avatar-8.jpg';
import avatar10 from '../../../../assets/images/users/avatar-10.jpg';
import avatar6 from '../../../../assets/images/users/avatar-6.jpg';
import avatar2 from '../../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../../assets/images/users/avatar-4.jpg';
import avatar7 from '../../../../assets/images/users/avatar-7.jpg';
import image4 from '../../../../assets/images/small/img-4.jpg';
import image5 from '../../../../assets/images/small/img-5.jpg';

//SimpleBar
import SimpleBar from 'simplebar-react';

const MeetingNote = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={12} lg={12}>
                    <Card>
                        <CardHeader className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Notes</h4>
                            <div className="flex-shrink-0">
                                <UncontrolledDropdown className="card-header-dropdown">
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem>Recent</DropdownItem>
                                        <DropdownItem>Top Rated</DropdownItem>
                                        <DropdownItem>Previous</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <SimpleBar style={{ height: '300px' }} className="px-3 mx-n3 mb-2">
                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0">
                                        <img src={avatar8} alt="" className="avatar-xs rounded-circle" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="fs-13">
                                            Joseph Parker <small className="text-muted ms-2">20 Dec 2021 - 05:47AM</small>
                                        </h5>
                                        <p className="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0">
                                        <img src={avatar6} alt="" className="avatar-xs rounded-circle" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="fs-13">
                                            Donald Palmer <small className="text-muted ms-2">24 Dec 2021 - 05:20PM</small>
                                        </h5>
                                        <p className="text-muted">
                                            If you have further questions, please contact Customer Support from the “Action Menu” on your{' '}
                                            <Link to="#" className="text-decoration-underline">
                                                Online Order Support
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <img src={avatar10} alt="" className="avatar-xs rounded-circle" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="fs-13">
                                            Alexis Clarke <small className="text-muted ms-2">26 min ago</small>
                                        </h5>
                                        <p className="text-muted">
                                            Your{' '}
                                            <Link to="#" className="text-decoration-underline">
                                                Online Order Support
                                            </Link>{' '}
                                            provides you with the most current status of your order. To help manage your order refer to the “Action Menu” to initiate return, contact Customer Support and more.
                                        </p>
                                    </div>
                                </div>
                            </SimpleBar>
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
