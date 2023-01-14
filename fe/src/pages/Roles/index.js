import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import ModalUpdate from './FormUpdate';
import ConfirmDelete from './ConfirmDelete';
import { Get, Create, Update, Delete } from '../../Services/role.service';

const Roles = () => {
    const [roleId, setRoleId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);
    const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);
    const fetchRole = () => {
        Get({}).then((res) => {
            setRoles(res);
        });
    };

    const showFormUpdate = (roleId) => {
        setRoleId(roleId);
        setShowFormUpdate(!isShowFormUpdate);
    };

    const showConfirmDelete = (roleId) => {
        setRoleId(roleId);
        setShowConfirmDelete(!isShowConfirmDelete);
    };

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };
    const closeConfirmDelete = () => {
        setShowConfirmDelete(false);
    };

    const save = (role) => {
        if (role?.id > 0) {
            Update(role)
                .then((res) => {
                    setShowFormUpdate(false);
                })
                .catch((err) => {});
        } else {
            Create(role)
                .then((res) => {
                    setRoles([...roles, res]);
                    setShowFormUpdate(false);
                })
                .catch((error) => {});
        }
    };

    const deleteRole = (roleId) => {
        Delete(roleId)
            .then((res) => {
                const newRoles = roles.filter((role) => role.id !== res);
                setRoles(newRoles);
                setShowConfirmDelete(false);
            })
            .catch((err) => {});
    };

    useEffect(() => {
        fetchRole();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Roles</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Roles</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success add-btn" onClick={() => showFormUpdate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <CardBody>
                                    <div className="table-responsive mt-3">
                                        <Table className="table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles.map((role, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <td>{role.name}</td>
                                                            <td>
                                                                <Button color="success btn-sm" onClick={() => showFormUpdate(role.id)}>
                                                                    Update
                                                                </Button>
                                                                <Button color="danger btn-sm mx-3" onClick={() => showConfirmDelete(role.id)}>
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
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} roleId={roleId} />
                    <ConfirmDelete deleteRole={deleteRole} isShowConfirmDelete={isShowConfirmDelete} closeConfirmDelete={closeConfirmDelete} roleId={roleId} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Roles;
