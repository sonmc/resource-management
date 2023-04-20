import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import MetaTags from 'react-meta-tags';
import Flatpickr from 'react-flatpickr';

//import images
import progileBg from '../../assets/images/profile-bg.jpg';
import avatar1 from '../../assets/images/users/avatar-1.jpg';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('1');

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Profile Settings | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <div className="position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg profile-setting-img">
                            <img src={progileBg} className="profile-wid-img" alt="" />
                            <div className="overlay-content">
                                <div className="text-end p-3">
                                    <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                                        <Input id="profile-foreground-img-file-input" type="file" className="profile-foreground-img-file-input" />
                                        <Label htmlFor="profile-foreground-img-file-input" className="profile-photo-edit btn btn-light">
                                            <i className="ri-image-edit-line align-bottom me-1"></i> Change Cover
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col xxl={3}>
                            <Card className="mt-n5">
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                            <img
                                                src={avatar1}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile"
                                            />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                                <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <h5 className="fs-16 mb-1">Anna Adame</h5>
                                        <p className="text-muted mb-0">Lead Designer / Developer</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xxl={9}>
                            <Card className="mt-xxl-n5">
                                <CardHeader>
                                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => {
                                                    tabChange('1');
                                                }}
                                            >
                                                <i className="fas fa-home"></i>
                                                Personal Details
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                to="#"
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => {
                                                    tabChange('2');
                                                }}
                                                type="button"
                                            >
                                                <i className="far fa-user"></i>
                                                Change Password
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Form>
                                                <Row>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="firstnameInput" className="form-label">
                                                                First Name
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="firstnameInput"
                                                                placeholder="Enter your firstname"
                                                                defaultValue="Dave"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="lastnameInput" className="form-label">
                                                                Last Name
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="lastnameInput"
                                                                placeholder="Enter your lastname"
                                                                defaultValue="Adame"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">
                                                                Phone Number
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="phonenumberInput"
                                                                placeholder="Enter your phone number"
                                                                defaultValue="+(1) 987 6543"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">
                                                                Email Address
                                                            </Label>
                                                            <Input
                                                                type="email"
                                                                className="form-control"
                                                                id="emailInput"
                                                                placeholder="Enter your email"
                                                                defaultValue="daveadame@velzon.com"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="JoiningdatInput" className="form-label">
                                                                Joining Date
                                                            </Label>
                                                            <Flatpickr
                                                                className="form-control"
                                                                options={{
                                                                    dateFormat: 'd M, Y',
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label">
                                                                Skills
                                                            </Label>
                                                            <select className="form-select mb-3">
                                                                <option>Select your Skill </option>
                                                                <option value="Choices1">CSS</option>
                                                                <option value="Choices2">HTML</option>
                                                                <option value="Choices3">PYTHON</option>
                                                                <option value="Choices4">JAVA</option>
                                                                <option value="Choices5">ASP.NET</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="designationInput" className="form-label">
                                                                Designation
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="designationInput"
                                                                placeholder="Designation"
                                                                defaultValue="Lead Designer / Developer"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="websiteInput1" className="form-label">
                                                                Website
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="websiteInput1"
                                                                placeholder="www.example.com"
                                                                defaultValue="www.velzon.com"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="cityInput" className="form-label">
                                                                City
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="cityInput"
                                                                placeholder="City"
                                                                defaultValue="California"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="countryInput" className="form-label">
                                                                Country
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="countryInput"
                                                                placeholder="Country"
                                                                defaultValue="United States"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="zipcodeInput" className="form-label">
                                                                Zip Code
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                minLength="5"
                                                                maxLength="6"
                                                                id="zipcodeInput"
                                                                placeholder="Enter zipcode"
                                                                defaultValue="90011"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3 pb-2">
                                                            <Label htmlFor="exampleFormControlTextarea" className="form-label">
                                                                Description
                                                            </Label>
                                                            <textarea
                                                                className="form-control"
                                                                id="exampleFormControlTextarea"
                                                                rows="3"
                                                                defaultValue="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."
                                                            ></textarea>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button" className="btn btn-primary">
                                                                Updates
                                                            </button>
                                                            <button type="button" className="btn btn-soft-success">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <Form>
                                                <Row className="g-2">
                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">
                                                                Old Password*
                                                            </Label>
                                                            <Input
                                                                type="password"
                                                                className="form-control"
                                                                id="oldpasswordInput"
                                                                placeholder="Enter current password"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="newpasswordInput" className="form-label">
                                                                New Password*
                                                            </Label>
                                                            <Input
                                                                type="password"
                                                                className="form-control"
                                                                id="newpasswordInput"
                                                                placeholder="Enter new password"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="confirmpasswordInput" className="form-label">
                                                                Confirm Password*
                                                            </Label>
                                                            <Input
                                                                type="password"
                                                                className="form-control"
                                                                id="confirmpasswordInput"
                                                                placeholder="Confirm password"
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Link to="#" className="link-primary text-decoration-underline">
                                                                Forgot Password ?
                                                            </Link>
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="text-end">
                                                            <button type="button" className="btn btn-success">
                                                                Change Password
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                            <div className="mt-4 mb-3 border-bottom pb-2">
                                                <div className="float-end">
                                                    <Link to="#" className="link-primary">
                                                        All Logout
                                                    </Link>
                                                </div>
                                                <h5 className="card-title">Login History</h5>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>iPhone 12 Pro</h6>
                                                    <p className="text-muted mb-0">Los Angeles, United States - March 16 at 2:47PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-tablet-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Apple iPad Pro</h6>
                                                    <p className="text-muted mb-0">Washington, United States - November 06 at 10:43AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Galaxy S21 Ultra 5G</h6>
                                                    <p className="text-muted mb-0">Conneticut, United States - June 12 at 3:24PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-macbook-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Dell Inspiron 14</h6>
                                                    <p className="text-muted mb-0">Phoenix, United States - July 26 at 8:10AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Settings;
