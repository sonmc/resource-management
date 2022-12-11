import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import UiContent from '../../Components/Common/UiContent';
import { Link } from 'react-router-dom';
import ModalUpdate from './FormUpdate';
import { Get, Create, Update } from '../../Services/user.service';
import { useRecoilValue } from 'recoil';
import { roleAtom } from '../../Recoil/states/role';

const Employees = () => {
    const roles = useRecoilValue(roleAtom);
    const [employeeId, setEmployeeId] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState({});
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);

    const fetchEmployee = () => {
        Get({}).then((res) => {
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
        if (employee.id) {
            Update(employee)
                .then((res) => {
                    setShowFormUpdate(false);
                })
                .catch((err) => {});
        } else {
            Create(employee)
                .then((res) => {
                    setEmployees([...employees, res]);
                })
                .catch((error) => {});
        }
    };

    useEffect(() => {
        fetchEmployee(filter);
    }, [filter]);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Employees</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <Button color="success" onClick={() => showFormUpdate()}>
                                        Create new
                                    </Button>
                                    <div className="table-responsive mt-3">
                                        <Table className="table-bordered table-hover align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
                                                    <th style={{ width: '10%', textAlign: 'center' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employees.map((emp, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <th>
                                                                <Link to="#" className="fw-medium">
                                                                    {emp.name}
                                                                </Link>
                                                            </th>
                                                            <td>{emp.email}</td>
                                                            <td>{emp.role.name}</td>
                                                            <td style={{ fontSize: 15, textAlign: 'center' }}>
                                                                <span className="badge bg-success">{emp.status ? 'Active' : 'Inactive'}</span>
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
                            </Card>
                        </Col>
                    </Row>
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} employeeId={employeeId} roles={roles} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Employees;
