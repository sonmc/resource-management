import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Login as OnLogin, GetCurrentUser } from 'src/Services/auth.service';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from 'src/Recoil/states/users';
import { notificationAtom } from 'src/Recoil/states/notification';
import { GetAll as GetNoti } from 'src/Services/notification.service';

const LoginPage = () => {
    const [notifications, setNotifications] = useRecoilState(notificationAtom);

    const history = useHistory();
    const [user, setCurrentUser] = useRecoilState(currentUserAtom);
    const [isShow, setIsShow] = useState(false);
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please enter your account'),
            password: Yup.string().required('Please enter your password'),
        }),
        onSubmit: (values) => {
            OnLogin(values).then((res) => {
                if (res) {
                    GetCurrentUser().then((user) => {
                        setCurrentUser(user);
                        history.push('/projects');
                        GetNoti({ user_id: user.id })
                            .then((res) => {
                                setNotifications(res);
                            })
                            .catch(() => {});
                    });
                }
            });
        },
    });
    return (
        <React.Fragment>
            <div className="auth-page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Login</title>
                </MetaTags>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center mt-sm-5 mb-4 text-white-50">
                                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Welcome Back !</h5>
                                        <p className="text-muted">Sign in to continue to Tool.</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <Form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                            action="#"
                                        >
                                            <div className="mb-3">
                                                <Label htmlFor="email" className="form-label">
                                                    Account
                                                </Label>
                                                <Input
                                                    name="username"
                                                    className="form-control"
                                                    placeholder="Enter your account"
                                                    type="username"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.username || ''}
                                                    invalid={validation.touched.email && validation.errors.username ? true : false}
                                                />
                                                {validation.touched.username && validation.errors.username ? (
                                                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="password-input">
                                                    Password
                                                </Label>
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <Input
                                                        name="password"
                                                        value={validation.values.password || ''}
                                                        type={isShow ? 'text' : 'password'}
                                                        className="form-control pe-5"
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={validation.touched.password && validation.errors.password ? true : false}
                                                    />
                                                    {validation.touched.password && validation.errors.password ? (
                                                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                    ) : null}
                                                    <button
                                                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                        type="button"
                                                        id="password-addon"
                                                        onClick={() => {
                                                            setIsShow((x) => !x);
                                                        }}
                                                    >
                                                        {isShow ? (
                                                            <i className="ri-eye-off-fill align-middle"></i>
                                                        ) : (
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <Button color="success" className="btn btn-success w-100" type="submit">
                                                    Sign In
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(LoginPage);
