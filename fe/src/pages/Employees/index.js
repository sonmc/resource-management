import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import ModalUpdate from './FormUpdate';
import { Get, Create } from '../../Services/user.service';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../../Recoil/states/roles';
import { STATUS_ACTIVE } from '../../Constant/index';

const Employees = () => {
    let roles = useRecoilValue(roleAtom);
    const [employeeId, setEmployeeId] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status: 0,
    });
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);

    const fetchEmployee = (filter) => {
        Get(filter).then((res) => {
            setEmployees(res);
        });
    };

    const showFormUpdate = (employeeId) => {
        setEmployeeId(employeeId);
        setShowFormUpdate(!isShowFormUpdate);
    };

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };

    const save = (employee) => {
        Create(employee)
            .then((res) => {
                if (employee?.id != 0) {
                    setEmployees([...employees.filter((x) => x.id !== res.id), res]);
                } else {
                    setEmployees([...employees, res]);
                }
            })
            .catch((error) => {});
        setShowFormUpdate(false);
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        if (event.target.name === 'status') {
            value = value === 'Active' ? 1 : 2;
        }
        setFilter({ ...filter, [event.target.name]: value });
    };

    useEffect(() => {
        fetchEmployee(filter);
    }, [filter]);
    console.log(filter);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Employees</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Employees</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success add-btn" onClick={() => showFormUpdate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <form>
                                        <div className="row">
                                            <div className="col-xxl-2 col-sm-4">
                                                <div className="input-light">
                                                    <select className="form-control" onChange={(x) => changeFilter(x)} data-choices data-choices-search-false name="roleId" id="slIdRole">
                                                        <option defaultValue="all">Select role</option>
                                                        {roles.map((role, key) => {
                                                            return (
                                                                <option key={key} value={role.id}>
                                                                    {role.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xxl-2 col-sm-4">
                                                <div className="input-light">
                                                    <select className="form-control" onChange={(x) => changeFilter(x)} data-choices data-choices-search-false name="status" id="slIdStatus">
                                                        <option defaultValue="all">Select status</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
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
                                        <Table className="table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>UserName</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees.map((emp, key) => {
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
                                                            <td style={{ fontSize: 15, textAlign: 'center' }}>
                                                                <span className={'badge ' + (emp.status == STATUS_ACTIVE ? 'bg-success' : 'bg-danger')}>{emp.status == STATUS_ACTIVE ? 'Active' : 'Inactive'}</span>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Button color="success btn-sm" onClick={() => showFormUpdate(emp.id)}>
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
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} employeeId={employeeId} roles={roles} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Employees;
