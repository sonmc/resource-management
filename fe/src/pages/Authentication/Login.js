import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback } from "reactstrap";
import ParticlesAuth from "./ParticlesAuth";
import { withRouter, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import logoLight from "../../assets/images/logo-light.png";

const Login = (props) => {
  const validation = useFormik({
    enableReinitialize: true,

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <MetaTags>
            <title>Basic SignIn | Velzon - React Admin & Dashboard Template</title>
          </MetaTags>
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
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
                      <p className="text-muted">Sign in to continue to Velzon.</p>
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
                            Email
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ? <FormFeedback type="invalid">{validation.errors.email}</FormFeedback> : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label" htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={validation.touched.password && validation.errors.password ? true : false}
                            />
                            {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
                            <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon">
                              <i className="ri-eye-fill align-middle"></i>
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
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
