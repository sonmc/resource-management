import React, { useEffect, useState } from 'react';
import { Col, CardBody } from 'reactstrap';
import DualListBox from 'react-dual-listbox';
import { Get as GetPermission } from 'src/Services/permission.service';
import { UpdateRolePerms } from 'src/Services/role.service';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_CONFIG, VACATION_TYPES } from '../../../Constant';

const RolePerm = (props) => {
    const { roles } = props;
    const [permissions, setPermissions] = useState([]);
    const [role, setRole] = useState({});
    const [permissionOfSelected, setPermissionSelected] = useState([]);

    const fetchPermissions = () => {
        GetPermission({}).then((res) => {
            setPermissions(
                res.map((x) => {
                    return { label: x.label, value: x.id };
                })
            );
        });
    };

    const onChange = (selected) => {
        setPermissionSelected(selected);
    };

    const savePermissions = () => {
        let model = {
            role_id: role.id,
            perm_ids: [],
        };
        permissionOfSelected.forEach((x) => {
            model.perm_ids.push(x);
        });
        UpdateRolePerms(model).then((res) => {
            toast.success('successfully !', TOAST_CONFIG);
        });
    };

    const changeRole = (e) => {
        let role = roles.find((x) => x.id == e.target.value);
        setRole(role);
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    useEffect(() => {
        if (roles.length > 0) {
            setRole(roles[0]);
        }
    }, [roles]);

    useEffect(() => {
        if (role?.id) {
            setPermissionSelected(role.permissions.map((x) => x.id));
        }
    }, [role]);

    return (
        <>
            <div className="card-header border-0">
                <div className="d-flex align-items-center">
                    <h3 className="card-title mb-0 flex-grow-1">Roles</h3>
                </div>
            </div>
            <CardBody>
                <Col lg={4} className="mb-3">
                    <select id="custom-select" className="form-select" onChange={changeRole}>
                        {roles.map((role, key) => {
                            return (
                                <option key={key} value={role.id}>
                                    Role - {role.name}
                                </option>
                            );
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
                <button className="btn btn-success mt-3" onClick={() => savePermissions()}>
                    Save
                </button>
            </CardBody>
        </>
    );
};

export default RolePerm;
