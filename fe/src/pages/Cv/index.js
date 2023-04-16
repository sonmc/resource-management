import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { Get as GetCvStore } from '../../Services/cv.service';

const CvManagementPage = () => {
    const [cvs, setCvs] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status: 0,
    });

    const fetchCvStore = (filter) => {
        GetCvStore(filter).then((res) => {
            setCvs(res);
        });
    };

    const upload = () => {};

    const changeFilter = (event) => {
        let value = event.target.value;
        if (event.target.name === 'status') {
            value = value === 'all' ? 0 : value;
        }
        setFilter({ ...filter, [event.target.name]: value });
    };

    useEffect(() => {
        fetchCvStore(filter);
    }, [filter]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Curriculum Vitae</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Curriculum Vitae</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success">
                                                <i className="ri-add-line align-bottom me-1"></i> Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <form>
                                        <div className="row">
                                            <div className="col-xxl-2 col-sm-4">
                                                <div className="search-box">
                                                    <input type="text" name="searchTerm" onChange={(x) => changeFilter(x)} className="form-control search" placeholder="Search by name" />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <CardBody>
                                    <div className="table-responsive mt-3">
                                        <Table className="table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>UserName</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cvs.map((emp, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>
                                                                <Link to="#" title="click for more detail" className="fw-medium">
                                                                    {emp.username}
                                                                </Link>
                                                            </th>
                                                            <td>{emp.email}</td>
                                                            <td>
                                                                {emp.roles
                                                                    .map((role) => {
                                                                        return role.name;
                                                                    })
                                                                    .join(', ')}
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

export default CvManagementPage;
