import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button, Label } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import ModalUpdate from './FormUpdate';
import ConfirmDelete from './ConfirmDelete';
import { Get as GetRole, Create, Update, Delete } from 'src/Services/role.service';
import RolePems from './RolePems';
import { useSetRecoilState } from 'recoil';
import { rolesState } from 'src/Recoil/states/roles';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_CONFIG, VACATION_TYPES } from '../../Constant';

import 'react-dual-listbox/lib/react-dual-listbox.css';

const RolePage = () => {
    const setRolesStore = useSetRecoilState(rolesState);
    const [roleId, setRoleId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);
    const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

    const fetchRole = () => {
        GetRole({}).then((res) => {
            setRoles(res);
            setRolesStore(res);
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
        let newRoles = [];
        if (role?.id > 0) {
            Update(role)
                .then((res) => {
                    newRoles = roles.map((role) => {
                        if (res.id === role.id) {
                            role.name = res.name;
                            role.description = res.description;
                        }
                        return role;
                    });
                    setRolesStore(newRoles);
                    setShowFormUpdate(false);
                })
                .catch((err) => {});
        } else {
            Create(role)
                .then((res) => {
                    newRoles = [{ ...res, permissions: [] }, ...roles];
                    setRoles(newRoles);
                    setRolesStore(newRoles);
                    setShowFormUpdate(false);
                })
                .catch((error) => {});
        }
        toast.success('successfully !', TOAST_CONFIG);
    };

    const deleteRole = (roleId) => {
        Delete(roleId)
            .then((res) => {
                const newRoles = roles.filter((role) => role.id !== res);
                setRoles(newRoles);
                setShowConfirmDelete(false);
                setRolesStore(newRoles);
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
                    <title>Zen8labs - Tools | Roles</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h3 className="card-title mb-0 flex-grow-1">Roles Management</h3>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormUpdate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> New
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <CardBody>
                                    <div className="table-responsive mt-3 col-lg-6">
                                        <Table className="table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 5 }}>No.</th>
                                                    <th>Role</th>
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
                                                                    Edit
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
                                <RolePems roles={roles} />
                            </div>
                        </Col>
                    </div>
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} roleId={roleId} />
                    <ConfirmDelete deleteRole={deleteRole} isShowConfirmDelete={isShowConfirmDelete} closeConfirmDelete={closeConfirmDelete} roleId={roleId} />
                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default RolePage;
