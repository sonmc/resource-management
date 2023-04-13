import { Table, Container, Col, CardBody, Row, Label, Input, Button, Spinner } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetById, Update, Create } from '../../../Services/new.service';
import { useHistory } from 'react-router-dom';
import { MyUploadAdapter } from '../../../helpers';
import UploadImage from '../../../Components/Common/UploadImage.js';

const InitialState = {
    id: 0,
    title: '',
    image: '',
    content: '',
    user_id: '',
};
const Component = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const { params } = props.match;
    const [formNew, setForm] = useState(InitialState);

    useEffect(() => {
        setIsEdit(!!params.id);
        if (params.id) {
            GetById(params.id)
                .then((res) => {
                    setForm(res);
                })
                .catch(() => {});
        }
    }, [params]);

    const handleSubmit = (formNew) => {
        if (formNew.id) {
            return Update(formNew);
        } else {
            return Create(formNew);
        }
    };

    const submit = (formNew) => {
        setSubmitted(true);
        let current_user = localStorage.getItem('currentUser');
        current_user = JSON.parse(current_user);
        const param = { ...formNew, user_id: current_user.user_id };
        handleSubmit(param)
            .then(() => {
                history.push('/new-management');
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
                    <title>Resource management | New management</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">{isEdit ? 'Edit' : 'Create'} New</h5>
                                    </div>
                                </div>

                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <Label for="firstNameinput" className="form-label">
                                                    Title
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter new title"
                                                    id="firstNameinput"
                                                    onChange={(event) => {
                                                        setForm((x) => {
                                                            x.title = event.target.value;
                                                            return x;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <Label for="firstNameinput" className="form-label">
                                                    Image
                                                </Label>
                                                <UploadImage
                                                    type="thumbnail"
                                                    setImage={(path) => {
                                                        setForm((x) => {
                                                            x.image = path;
                                                            return { ...x };
                                                        });
                                                    }}
                                                    currentUrl={formNew.image}
                                                />
                                            </div>
                                        </Col>

                                        <Col md={12}>
                                            <div className="mb-3">
                                                <Label for="compnayNameinput" className="form-label">
                                                    Content
                                                </Label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    onReady={(editor) => {
                                                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                                            return new MyUploadAdapter(loader, 'news');
                                                        };
                                                    }}
                                                    onChange={(event, editor) => {
                                                        setForm((x) => {
                                                            x.content = editor.getData();
                                                            return x;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </Col>

                                        <Col md={12}>
                                            <div className="text-end">
                                                <Button
                                                    color="success"
                                                    className="btn-load"
                                                    onClick={() => {
                                                        submit(formNew);
                                                    }}
                                                    disabled={submitted}
                                                >
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
                                    </Row>
                                </CardBody>
                            </div>
                        </Col>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};
export default Component;
