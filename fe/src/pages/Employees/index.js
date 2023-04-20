import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import ModalUpdate from './FormUpdate';
import ConfirmDelete from './ConfirmDelete';
import { Get as GetEmployee, Create, Delete } from 'src/Services/user.service';
import { Get as GetRole } from 'src/Services/role.service';
import { usersState } from 'src/Recoil/states/users';
import { useSetRecoilState } from 'recoil';
import { LEVEL_STATUS } from '../../Constant';

const levelStatus = LEVEL_STATUS;
const EmployeePage = () => {
    const setUsersStore = useSetRecoilState(usersState);
    const [roles, setRoles] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [employeeDelete, setEmployeeDelete] = useState({ id: 0, full_name: '' });
    const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status: 0,
    });
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);

    const fetchEmployee = (filter) => {
        GetEmployee(filter).then((res) => {
            setEmployees(res);
            setUsersStore(res);
        });
    };

    const fetchRole = (filter) => {
        GetRole(filter).then((res) => {
            setRoles(res);
        });
    };

    const showFormUpdate = (employeeId) => {
        setEmployeeId(employeeId);
        setShowFormUpdate(!isShowFormUpdate);
    };

    const confirmDelete = (employeeId) => {
        const empDelete = employees.find((e) => e.id === employeeId);
        setEmployeeDelete(empDelete);
        setShowConfirmDelete(true);
    };

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };

    const save = (employee) => {
        Create(employee)
            .then((res) => {
                if (employee?.id != 0) {
                    setEmployees([...employees.filter((x) => x.id !== res.id), res]);
                    setUsersStore([...employees.filter((x) => x.id !== res.id), res]);
                } else {
                    setEmployees([...employees, res]);
                    setUsersStore([...employees, res]);
                }
            })
            .catch((error) => {});
        setShowFormUpdate(false);
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        if (event.target.name === 'status') {
            value = value === 'all' ? 0 : value;
        }
        setFilter({ ...filter, [event.target.name]: value });
    };

    const closeConfirmDelete = () => {
        setShowConfirmDelete(false);
    };

    const deleteEmployee = (employeeId) => {
        Delete(employeeId)
            .then((res) => {
                const newList = employees.filter((e) => e.id !== res);
                setEmployees(newList);
                setShowConfirmDelete(false);
            })
            .catch((err) => {});
    };

    useEffect(() => {
        fetchEmployee(filter);
    }, [filter]);

    useEffect(() => {
        fetchRole();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Employees</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Employees</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormUpdate()}>
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
                                                    <select
                                                        className="form-control"
                                                        onChange={(x) => changeFilter(x)}
                                                        data-choices
                                                        data-choices-search-false
                                                        name="roleId"
                                                        id="slIdRole"
                                                    >
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
                                                    <select
                                                        className="form-control"
                                                        onChange={(x) => changeFilter(x)}
                                                        data-choices
                                                        data-choices-search-false
                                                        name="status"
                                                        id="slIdStatus"
                                                    >
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
                                                    <input
                                                        type="text"
                                                        name="searchTerm"
                                                        onChange={(x) => changeFilter(x)}
                                                        className="form-control search"
                                                        placeholder="Search by name"
                                                    />
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
                                                    <th style={{ width: '20%', textAlign: 'center' }}></th>
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
                                                                {levelStatus.find((x) => x.id == emp.status_level).title}
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Button color="success btn-sm me-2" onClick={() => showFormUpdate(emp.id)}>
                                                                    Update
                                                                </Button>
                                                                <Button color="danger btn-sm" onClick={() => confirmDelete(emp.id)}>
                                                                    Delete
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
                    <ModalUpdate
                        save={save}
                        isShowFormUpdate={isShowFormUpdate}
                        closeFormUpdate={closeFormUpdate}
                        employeeId={employeeId}
                        roles={roles}
                        employees={employees.filter((x) => {
                            return x.id !== employeeId;
                        })}
                    />
                    <ConfirmDelete
                        deleteEmployee={deleteEmployee}
                        isShowConfirmDelete={isShowConfirmDelete}
                        closeConfirmDelete={closeConfirmDelete}
                        employee={employeeDelete}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default EmployeePage;
