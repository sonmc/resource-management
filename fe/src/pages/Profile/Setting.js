import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import MetaTags from 'react-meta-tags';
import Flatpickr from 'react-flatpickr';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentUserAtom } from '../../Recoil/states/users';
//import images
import progileBg from '../../assets/images/profile-bg.jpg';
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import { Upload } from '../../Services/share.service';
import { UpdateInfo, UpdatePassword } from '../../Services/user.service';

const Settings = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    const [avatar, setAvatar] = useState(avatar1);
    const [form, setForm] = useState(currentUser);
    const [formPassword, setFormPassword] = useState({});
    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);
    const [activeTab, setActiveTab] = useState('1');

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const changeInput = (e) => {
        setForm((x) => {
            return { ...x, [e.target.name]: e.target.value };
        });
    };
    const changePassword = (e) => {
        setFormPassword((x) => {
            return { ...x, [e.target.name]: e.target.value };
        });
    };

    const updateInfo = () => {
        UpdateInfo(form)
            .then((res) => {
                setCurrentUser(res);
            })
            .catch();
    };
    const updatePassword = () => {
        UpdatePassword(formPassword)
            .then((res) => {})
            .catch();
    };
    const UploadImage = (e) => {
        let files = e.target.files;
        Upload(files)
            .then((res) => {
                let url = process.env.REACT_APP_API_URL + '/' + res.imagePath;
                setAvatar(url);
                setForm((x) => {
                    return { ...x, avatar: url };
                });
            })
            .catch((err) => {});
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Profile Settings </title>
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
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile"
                                                src={avatar}
                                                onError={() => {
                                                    setAvatar(avatar1);
                                                }}
                                            />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                <Input
                                                    id="profile-img-file-input"
                                                    type="file"
                                                    className="profile-img-file-input"
                                                    onChange={UploadImage}
                                                />
                                                <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>
                                        <h5 className="fs-16 mb-1">{currentUser.full_name}</h5>
                                        <p className="text-muted mb-0">{currentUser.roles}</p>
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
                                                                value={form.first_name}
                                                                name="first_name"
                                                                onChange={changeInput}
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
                                                                value={form.last_name}
                                                                name="last_name"
                                                                onChange={changeInput}
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
                                                                value={form.phone_number}
                                                                name="phone_number"
                                                                onChange={changeInput}
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
                                                                value={form.email}
                                                                name="email"
                                                                onChange={changeInput}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="JoiningdatInput" className="form-label">
                                                                Joining Date
                                                            </Label>
                                                            <Flatpickr
                                                                className="form-control"
                                                                options={{
                                                                    dateFormat: 'Y-m-d',
                                                                }}
                                                                onChange={([value]) => {
                                                                    changeInput({ target: { name: 'onboarding', value } });
                                                                }}
                                                                value={form.onboarding}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="JoiningdatInput" className="form-label">
                                                                Address
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                className="form-control"
                                                                id="addressInput"
                                                                placeholder="Enter your address"
                                                                value={form.address}
                                                                name="address"
                                                                onChange={changeInput}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button" className="btn btn-primary" onClick={updateInfo}>
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
                                                                value={formPassword.old_password}
                                                                onChange={changePassword}
                                                                name="old_password"
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
                                                                value={formPassword.new_password}
                                                                name="new_password"
                                                                onChange={changePassword}
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
                                                                value={formPassword.confirm_password}
                                                                name="confirm_password"
                                                                onChange={changePassword}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="text-end">
                                                            <button type="button" className="btn btn-success" onClick={updatePassword}>
                                                                Change Password
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
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