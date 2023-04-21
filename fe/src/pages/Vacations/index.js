import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { Get } from 'src/Services/user.service';
import { Get as GetRole } from 'src/Services/role.service';
import { usersState } from 'src/Recoil/states/users';
import { useSetRecoilState } from 'recoil';
import { LEVEL_STATUS } from '../../Constant';

const levelStatus = LEVEL_STATUS;

const Vacations = () => {
    const [vacations, setVacation] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status: 0,
    });
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);

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
                                                        {levelStatus.map((item, key) => {
                                                            return (
                                                                <option key={key} value={item.id}>
                                                                    {item.title}
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
                                                    <th>Start</th>
                                                    <th>End</th>
                                                    <th>User</th>
                                                    <th>Created at</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vacations.map((emp, key) => {
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
                                                            <td style={{ fontSize: 15, textAlign: 'center' }}>{levelStatus.find((x) => x.id == emp.status_level).title}</td>
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
