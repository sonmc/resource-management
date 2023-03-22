import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button, Label } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import ModalUpdate from './FormUpdate';
import ConfirmDelete from './ConfirmDelete';
import { Get as GetRole, Create, Update, Delete } from '../../Services/role.service';
import { Get as GetPermission } from '../../Services/permission.service';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

const Roles = () => {
    const [permissionOfSelected, setPermissionSelected] = useState([]);
    const [roleId, setRoleId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);
    const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);
    const fetchRole = () => {
        GetRole({}).then((res) => {
            setRoles(res);
        });
    };

    const fetchPermissions = () => {
        GetPermission({}).then((res) => {
            setPermissions(res);
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

    const onChange = (selected) => {
        this.setState({ selected });
    };

    const savePermissions = () => {};

    useEffect(() => {
        fetchRole();
        fetchPermissions();
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
                                        <h3 className="card-title mb-0 flex-grow-1">Roles</h3>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormUpdate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <CardBody>
                                    <div className="table-responsive mt-3 col-lg-6">
                                        <Table className="table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles.map((role, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <th>{key + 1}</th>
                                                            <td>{role.name}</td>
                                                            <td>{role.description}</td>
                                                            <td>
                                                                <Button color="success btn-sm me-2" onClick={() => showFormUpdate(role.id)}>
                                                                    Update
                                                                </Button>
                                                                <Button color="danger btn-sm btn-action" onClick={() => showConfirmDelete(role.id)}>
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
                                <hr style={{ color: '#c0c0c0' }} />
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h3 className="card-title mb-0 flex-grow-1">Roles</h3>
                                    </div>
                                </div>

                                <CardBody>
                                    <Col lg={4} className="mb-3">
                                        <select id="custom-select" className="form-select">
                                            {roles.map((role, key) => {
                                                return <option key={key}>Role - {role.name}</option>;
                                            })}
                                        </select>
                                    </Col>
                                    <h6 className="card-title flex-grow-1 mb-2">Permissions</h6>
                                    <Col lg={8}>
                                        <DualListBox
                                            options={permissions}
                                            selected={permissionOfSelected}
                                            onChange={onChange}
                                            icons={{
                                                moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
                                                moveAllLeft: [<span className="mdi mdi-chevron-double-left" key="key" />],
                                                moveRight: <span className="mdi mdi-chevron-right" key="key" />,
                                                moveAllRight: [<span className="mdi mdi-chevron-double-right" key="key" />],
                                                moveDown: <span className="mdi mdi-chevron-down" key="key" />,
                                                moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                                                moveTop: <span className="mdi mdi-chevron-double-up" key="key" />,
                                                moveBottom: <span className="mdi mdi-chevron-double-down" key="key" />,
                                            }}
                                        />
                                    </Col>
                                    <button className="btn btn-success btn-action  mt-3" onClick={() => savePermissions()}>
                                        Save
                                    </button>
                                </CardBody>
                            </div>
                        </Col>
                    </div>
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} roleId={roleId} />
                    <ConfirmDelete
                        deleteRole={deleteRole}
                        isShowConfirmDelete={isShowConfirmDelete}
                        closeConfirmDelete={closeConfirmDelete}
                        roleId={roleId}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Roles;
