import React, { useEffect, useState } from 'react';
import { Col, Button, Spinner, Label, Card, Container, CardBody, Row, CardHeader, FormGroup } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import './index.scss';
import { MetaTags } from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Update } from 'src/Services/candidate.service';
import CkeditorCommon from 'src/Components/Common/Ckeditor';
import { formatTime } from 'src/helpers/common';
import FormArray from './TemplateFormArray';
const Index = (props) => {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState(undefined);
    const { state } = props.location;
    const { params } = props.match;
    const parseData = (input) => {
        try {
            return JSON.parse(input);
        } catch (_error) {
            return '';
        }
    };
    const stringifyData = (input) => {
        return JSON.stringify(input);
    };
    useEffect(() => {
        setIsEdit(!!params.id);
        if (params.id) {
            let data = state.candidate;
            setForm(data);
        } else {
            setForm({
                name: '',
                position: '',
                gender: '1',
                phone_number: '',
                email: '',
                dob: '',
                address: '',
                introduce: '',
                educations: [],
                projects: [],
                work_experiences: [],
                cv_skill: [],
            });
        }
    }, [state, params]);
    const submit = (value) => {
        setSubmitted(true);
        const param = {
            ...value,
            educations: stringifyData(value.educations),
            projects: stringifyData(value.projects),
            work_experiences: stringifyData(value.work_experiences),
            cv_skill: stringifyData(value.cv_skill),
        };
        Update(param)
            .then(() => {
                history.push('/candidates');
            })
            .catch()
            .finally(() => {
                setSubmitted(false);
            });
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Candidate management</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">{isEdit ? 'Edit' : 'Create'} candidate</h5>
                                        <div className="flex-shrink-0">
                                            <button
                                                className="btn btn-soft-dark"
                                                onClick={() => {
                                                    history.push('/candidates');
                                                }}
                                            >
                                                <i className="ri-arrow-left-s-line align-bottom me-1"></i> Back
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    {form && (
                                        <Formik
                                            initialValues={form}
                                            onSubmit={(values) => {
                                                submit(values);
                                            }}
                                        >
                                            {({ setFieldValue, values }) => (
                                                <Form>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <h5 className="pb-2"> Personal information</h5>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <div className="section-page-content mb-3">
                                                                <div className="page-box p-3">
                                                                    <Row>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="name">
                                                                                    Full name <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="name"
                                                                                    placeholder="Enter name"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="position">
                                                                                    Position <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="position"
                                                                                    placeholder="Enter position"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="gender">
                                                                                    Gender <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <FormGroup>
                                                                                    <Field type="radio" name="gender" value={'1'} /> Male &ensp;
                                                                                    <Field type="radio" name="gender" value={'0'} /> Female
                                                                                </FormGroup>
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="email">
                                                                                    Email <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <Field
                                                                                    type="email"
                                                                                    className="form-control"
                                                                                    name="email"
                                                                                    placeholder="Enter email"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="phone_number">
                                                                                    Phone number <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="phone_number"
                                                                                    placeholder="Enter phone number"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={4}>
                                                                            <FormGroup>
                                                                                <Label for="dob">
                                                                                    Date of birth <span className="text-danger">*</span>
                                                                                </Label>
                                                                                <Flatpickr
                                                                                    className="form-control"
                                                                                    options={{
                                                                                        dateFormat: 'Y-m-d',
                                                                                    }}
                                                                                    onChange={([value]) => {
                                                                                        setFieldValue('dob', formatTime(value));
                                                                                    }}
                                                                                    value={values.dob}
                                                                                    placeholder="Select Date"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={12}>
                                                                            <FormGroup>
                                                                                <Label for="address">Address</Label>
                                                                                <Field
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    name="address"
                                                                                    placeholder="Enter address"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col xxl={12}>
                                                                            <FormGroup>
                                                                                <Label for="introduce">Introduce</Label>
                                                                                <Field
                                                                                    name="introduce"
                                                                                    render={({ field, form }) => {
                                                                                        return (
                                                                                            <>
                                                                                                <CkeditorCommon
                                                                                                    setValue={(value) => {
                                                                                                        form.setFieldValue(field.name, value);
                                                                                                    }}
                                                                                                    value={field.value}
                                                                                                />
                                                                                            </>
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <FormArray
                                                        name={'educations'}
                                                        values={values}
                                                        title={'Educations'}
                                                        emptyValue={{
                                                            date_start: '',
                                                            date_end: '',
                                                            description: '',
                                                        }}
                                                        Component={Template}
                                                        setFieldValue={setFieldValue}
                                                        type={1}
                                                    />
                                                    <FormArray
                                                        name={'work_experiences'}
                                                        values={values}
                                                        title={'Work experiences'}
                                                        emptyValue={{
                                                            date_start: '',
                                                            date_end: '',
                                                            description: '',
                                                        }}
                                                        Component={Template}
                                                        setFieldValue={setFieldValue}
                                                        type={1}
                                                    />
                                                    <FormArray
                                                        name={'projects'}
                                                        values={values}
                                                        title={'Projects'}
                                                        emptyValue={{
                                                            name: '',
                                                            description: '',
                                                        }}
                                                        Component={Template}
                                                        setFieldValue={setFieldValue}
                                                        type={2}
                                                    />
                                                    <FormArray
                                                        name={'cv_skill'}
                                                        values={values}
                                                        title={'Skills'}
                                                        emptyValue={{
                                                            name: '',
                                                            description: '',
                                                        }}
                                                        Component={Template}
                                                        setFieldValue={setFieldValue}
                                                        type={2}
                                                    />
                                                    <Col md={12}>
                                                        <div className="text-end">
                                                            <Button color="success" className="btn-load" type="submit" disabled={submitted}>
                                                                <span className="d-flex align-items-center">
                                                                    {submitted ? (
                                                                        <Spinner size="sm" className="flex-shrink-0" role="status">
                                                                            Submit
                                                                        </Spinner>
                                                                    ) : (
                                                                        <span className="flex-grow-1 me-2">Submit</span>
                                                                    )}
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Form>
                                            )}
                                        </Formik>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

const Template = ({ index, arrayHelpers, name_parent, values, setFieldValue, type }) => {
    return (
        <div className="page-box p-3 form-array-custom">
            <Row>
                <Col lg={10}>
                    <Row>
                        {type === 1 ? (
                            <>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label for="from">From</Label>
                                        <Flatpickr
                                            className="form-control"
                                            options={{
                                                dateFormat: 'Y-m-d',
                                            }}
                                            onChange={([value]) => {
                                                setFieldValue(`${name_parent}.${index}.date_start`, formatTime(value));
                                            }}
                                            value={values.date_start}
                                            placeholder="Select Date"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label for="to">To</Label>
                                        <Flatpickr
                                            className="form-control"
                                            options={{
                                                dateFormat: 'Y-m-d',
                                            }}
                                            onChange={([value]) => {
                                                setFieldValue(`${name_parent}.${index}.date_end`, formatTime(value));
                                            }}
                                            value={values.date_end}
                                            placeholder="Select Date"
                                        />
                                    </FormGroup>
                                </Col>
                            </>
                        ) : (
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Field type="text" className="form-control" name={`${name_parent}.${index}.name`} placeholder="Enter name" />
                                </FormGroup>
                            </Col>
                        )}

                        <Col lg={12}>
                            <FormGroup>
                                <Label for="from">Description</Label>
                                <Field
                                    name={`${name_parent}.${index}.description`}
                                    render={({ field, form }) => {
                                        return (
                                            <>
                                                <CkeditorCommon
                                                    setValue={(value) => {
                                                        form.setFieldValue(field.name, value);
                                                    }}
                                                    value={field.value}
                                                />
                                            </>
                                        );
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col lg={1} className="d-flex align-items-center">
                    <a
                        href="!#"
                        className="link-danger fs-15"
                        onClick={(event) => {
                            event.preventDefault();
                            arrayHelpers.remove(index);
                        }}
                    >
                        <i className="ri-delete-bin-line"></i>
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
