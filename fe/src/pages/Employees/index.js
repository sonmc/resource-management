import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button, Input, Label } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import ModalUpdate from './FormUpdate';
import { Get as GetEmployee, Create, Update } from 'src/Services/user.service';
import { Get as GetRole } from 'src/Services/role.service';
import { useSetRecoilState } from 'recoil';
import { CONFIRM_TYPE, LEVEL_STATUS, STATUS } from '../../Constant';
import ConfirmModal from 'src/Components/Common/ConfirmModal';
const levelStatus = LEVEL_STATUS;

const EmployeePage = () => {
    const [roles, setRoles] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);
    const [dataConfirm, setDataConfirm] = useState({});

    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status_level: 0,
        status: 0,
    });
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);

    const fetchEmployee = (filter) => {
        GetEmployee(filter).then((res) => {
            setEmployees(res);
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

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };

    const save = (employee) => {
        return Create(employee)
            .then((res) => {
                if (employee?.id != 0) {
                    setEmployees((emps) => {
                        return emps.map((x) => {
                            if (x.id !== res.id) return x;
                            return res;
                        });
                    });
                } else {
                    setEmployees([...employees, res]);
                }
                setShowFormUpdate(false);
            })
            .catch((error) => {});
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        setFilter({ ...filter, [event.target.name]: parseInt(value) });
    };

    const closeConfirm = () => {
        setDataConfirm({ isOpen: false });
    };
    const openModal = (status, employee) => {
        let statusMessage = 'active';
        if (status == 2) {
            statusMessage = 'inactive';
        }
        let data = {
            message: ` Are you sure you want to ${statusMessage} "${employee.first_name} ${employee.last_name}" ?`,
            title: `Confirm ${statusMessage} Employee`,
            typeConfirm: CONFIRM_TYPE.CONFIRM,
            isOpen: true,
            value: { employee, status },
        };
        setDataConfirm(data);
    };
    const onConfirmClick = (value) => {
        save({ ...value.employee, status: value.status }).then((x) => {
            closeConfirm();
        });
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
                                        <h5 className="card-title mb-0 flex-grow-1">Employee Management</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormUpdate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> New
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
                                                        <option value="0">Select role</option>
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
                                                        name="status_level"
                                                        id="slIdStatus"
                                                    >
                                                        <option value="0">Select contract type </option>
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
                                                <div className="input-light">
                                                    <select
                                                        className="form-control"
                                                        onChange={(x) => changeFilter(x)}
                                                        data-choices
                                                        data-choices-search-false
                                                        name="status"
                                                        id="slIdStatus"
                                                    >
                                                        <option value="0">Select status</option>
                                                        {STATUS.map((item, key) => {
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
                                        <Table className="table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Full name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th style={{ width: '10%' }}>Contract Type</th>
                                                    <th>Status</th>
                                                    <th style={{ width: '20%', textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees.map((emp, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>
                                                                <Link to="#" title="click for more detail" className="fw-medium">
                                                                    {emp.first_name} {emp.last_name}
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
                                                            <td style={{ fontSize: 15 }}>
                                                                {levelStatus.find((x) => x.id == emp.status_level).title}
                                                            </td>
                                                            <td>
                                                                <div className="form-check form-switch form-switch-success mb-3">
                                                                    <Input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        role="switch"
                                                                        id="SwitchCheck3"
                                                                        checked={emp.status == STATUS[0].id}
                                                                        onChange={(x) => {
                                                                            let status = !(emp.status == STATUS[0].id) ? 1 : 2;
                                                                            openModal(status, emp);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <Button color="success btn-sm me-2" onClick={() => showFormUpdate(emp.id)}>
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
                </Container>
            </div>
            <ConfirmModal data={dataConfirm} onConfirmClick={onConfirmClick} onCloseClick={closeConfirm} />
        </React.Fragment>
    );
};

export default EmployeePage;
