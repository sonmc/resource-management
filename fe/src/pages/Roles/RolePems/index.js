import React, { useEffect, useState } from 'react';
import { Col, CardBody } from 'reactstrap';
import DualListBox from 'react-dual-listbox';
import { Get as GetPermission } from '../../../Services/permission.service';
import { UpdateRolePems } from '../../../Services/role.service';
const Component = (props) => {
    const { roles } = props;
    console.log(roles);
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
    const onChange = (selected) => {
        setPermissionSelected(selected);
    };
    const savePermissions = () => {
        let model = permissionOfSelected.map((x) => {
            return { role_id: role.id, permission_id: x };
        });
        UpdateRolePems(model);
    };
    const changeRole = (e) => {
        let role = roles.find((x) => x.id == e.target.value);
        setRole(role);
    };
    return (
        <>
            {' '}
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
                <button className="btn btn-success btn-action  mt-3" onClick={() => savePermissions()}>
                    Save
                </button>
            </CardBody>
        </>
    );
};

export default Component;
