import { Table, Container, Col, CardBody, Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { GetAll } from '../../Services/new.service';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Component = () => {
    const history = useHistory();

    const [news, setNews] = useState([]);
    useEffect(() => {
        GetAll({})
            .then((res) => {
                setNews(res);
            })
            .catch(() => {
                setNews([{ id: 1, title: 'Tin 1', created_at: 1681241552, created_by: 'admin' }]);
            });
    }, []);

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
                                        <h5 className="card-title mb-0 flex-grow-1">News</h5>
                                        <div className="flex-shrink-0">
                                            <button
                                                className="btn btn-success"
                                                onClick={() => {
                                                    history.push('/new-management/add');
                                                }}
                                            >
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <CardBody>
                                    <div className="table-responsive mt-3">
                                        <Table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Title</th>
                                                    <th>Created by</th>
                                                    <th>Created at</th>

                                                    <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {news.map((n, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{n.title}</td>
                                                            <td>
                                                                {n.user.first_name} {n.user.last_name}
                                                            </td>
                                                            <td>{moment(n.created_at * 1000).format('DD/MM/YYYY hh:mm:ss')}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Button
                                                                    color="success btn-sm"
                                                                    onClick={() => {
                                                                        history.push('/new-management/edit/' + n.id);
                                                                    }}
                                                                >
                                                                    Update
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
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
