import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Get } from 'src/Services/vacation.service';
import { VACATION_TYPES, VACATION_STATUS } from '../../Constant';
import moment from 'moment';

const vacation_types = VACATION_TYPES;
const vacation_status = VACATION_STATUS;

const Vacations = () => {
    const [vacations, setVacation] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: '',
        status: 0,
    });

    const fetchVacation = (filter) => {
        Get(filter).then((res) => {
            setVacation(res);
        });
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        if (event.target.name === 'status') {
            value = value === 'all' ? 0 : value;
        }
        setFilter({ ...filter, [event.target.name]: value });
    };

    useEffect(() => {
        fetchVacation(filter);
    }, [filter]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Vacations</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Vacations</h5>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <form>
                                        <div className="row">
                                            <div className="col-xxl-2 col-sm-4">
                                                <div className="input-light">
                                                    <select className="form-control" onChange={(x) => changeFilter(x)} data-choices data-choices-search-false name="status" id="slIdStatus">
                                                        <option value="all">Select status</option>
                                                        {vacation_types.map((item, key) => {
                                                            return (
                                                                <option key={key} value={item.key}>
                                                                    {item.value}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
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
                                        <Table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Reason</th>
                                                    <th>Type</th>
                                                    <th>User</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Status</th>
                                                    <th>Request created at</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vacations.map((va, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <td>{va.reason}</td>
                                                            <td>{vacation_types.find((x) => x.key == va.type).value}</td>
                                                            <td>
                                                                {va.user.first_name} {va.user.last_name}
                                                            </td>
                                                            <td>{moment(va.start).format('DD/MM/YYYY')}</td>
                                                            <td>{moment(va.end).format('DD/MM/YYYY')}</td>
                                                            <td>{vacation_status.find((x) => x.key == va.status).value}</td>
                                                            <td>{moment(va.created_at).format('DD/MM/YYYY hh:mm:ss')}</td>
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

export default Vacations;
