import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import MetaTags from 'react-meta-tags';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from '../../Recoil/states/users';
//import images
import progileBg from 'src/assets/images/profile-bg.jpg';
import avatar1 from 'src/assets/images/users/avatar-1.jpg';
import { Upload } from 'src/Services/share.service';
import { UpdateInfo, UpdatePassword, UpdateAvatar } from 'src/Services/user.service';
import { MyUploadAdapter } from 'src/helpers';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const base_url = process.env.REACT_APP_API_URL;
const Settings = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [isShow, setIsShow] = useState({ old_password: false, new_password: false, confirm_password: false });

    const [avatar, setAvatar] = useState(avatar1);
    const [form, setForm] = useState({ ...currentUser });
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
        const param = {
            ...formPassword,
            id: currentUser.id,
        };
        UpdatePassword(param)
            .then((res) => {
                if (res) {
                    // window.location.reload();
                }
            })
            .catch();
    };
    const updateUserAvatar = (avatar) => {
        const param = {
            avatar: avatar,
            id: currentUser.id,
        };
        UpdateAvatar(param)
            .then((res) => {})
            .catch();
    };

    const UploadImage = (e) => {
        let files = e.target.files;
        Upload(files)
            .then((res) => {
                let url = process.env.REACT_APP_API_URL + '/' + res.imagePath;
                setAvatar(url);
                updateUserAvatar(res.imagePath);
                setForm((x) => {
                    return { ...x, avatar: url };
                });
            })
            .catch((err) => {});
    };
    const back = () => {};
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
                                                src={base_url + '/' + currentUser.avatar}
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
                                                    <Col lg={3}>
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
                                                    <Col lg={3}>
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
                                                            <Label htmlFor="firstnameInput" className="form-label">
                                                                Nick Name
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
                                                    <Col lg={3}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">
                                                                Email
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

                                                    <Col lg={3}>
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
                                                        <div className="mb-3">
                                                            <Label htmlFor="JoiningdatInput" className="form-label">
                                                                Introduce
                                                            </Label>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={form?.introduce}
                                                                onReady={(editor) => {
                                                                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                                                        return new MyUploadAdapter(loader, 'news');
                                                                    };
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    setForm((x) => {
                                                                        x.introduce = editor.getData();
                                                                        return { ...x };
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button" className="btn btn-success" onClick={updateInfo}>
                                                                Update
                                                            </button>
                                                            <button type="button" onClick={back} className="btn btn-soft-default">
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
                                                    <Col lg={12}>
                                                        <Label htmlFor="oldpasswordInput" className="form-label">
                                                            Old Password <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Input
                                                                type={isShow.old_password ? 'text' : 'password'}
                                                                className="form-control pe-5"
                                                                placeholder="Enter current password"
                                                                value={formPassword.old_password}
                                                                onChange={changePassword}
                                                                name="old_password"
                                                            />
                                                            <button
                                                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                                type="button"
                                                                id="password-addon"
                                                                onClick={() => {
                                                                    setIsShow((x) => {
                                                                        return { ...x, old_password: !x.old_password };
                                                                    });
                                                                }}
                                                            >
                                                                {isShow.old_password ? (
                                                                    <i className="ri-eye-off-fill align-middle"></i>
                                                                ) : (
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </Col>

                                                    <Col lg={6} className="mt-3">
                                                        <Label htmlFor="newpasswordInput" className="form-label">
                                                            New Password <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Input
                                                                type={isShow.new_password ? 'text' : 'password'}
                                                                className="form-control pe-5"
                                                                id="newpasswordInput"
                                                                placeholder="Enter new password"
                                                                value={formPassword.new_password}
                                                                name="new_password"
                                                                onChange={changePassword}
                                                            />
                                                            <button
                                                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                                type="button"
                                                                id="password-addon"
                                                                onClick={() => {
                                                                    setIsShow((x) => {
                                                                        return { ...x, new_password: !x.new_password };
                                                                    });
                                                                }}
                                                            >
                                                                {isShow.new_password ? (
                                                                    <i className="ri-eye-off-fill align-middle"></i>
                                                                ) : (
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6} className="mt-3">
                                                        <Label htmlFor="confirmpasswordInput" className="form-label">
                                                            Confirm Password <span className="text-danger">*</span>
                                                        </Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Input
                                                                type={isShow.confirm_password ? 'text' : 'password'}
                                                                className="form-control pe-5"
                                                                id="confirmpasswordInput"
                                                                placeholder="Confirm password"
                                                                value={formPassword.confirm_password}
                                                                name="confirm_password"
                                                                onChange={changePassword}
                                                            />
                                                            <button
                                                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                                type="button"
                                                                id="password-addon"
                                                                onClick={() => {
                                                                    setIsShow((x) => {
                                                                        return { ...x, confirm_password: !x.confirm_password };
                                                                    });
                                                                }}
                                                            >
                                                                {isShow.confirm_password ? (
                                                                    <i className="ri-eye-off-fill align-middle"></i>
                                                                ) : (
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                )}
                                                            </button>
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
