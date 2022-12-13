import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import ModalUpdate from "./FormUpdate";
import { Get, Create, Update } from "../../Services/role.service";

const Roles = () => {
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [isShowFormUpdate, setShowFormUpdate] = useState(false);

  const fetchRole = () => {
    Get({}).then((res) => {
      setRoles(res);
    });
  };

  const showFormUpdate = (roleId) => {
    setRoleId(roleId);
    setShowFormUpdate(!isShowFormUpdate);
  };

  const closeFormUpdate = () => {
    setShowFormUpdate(false);
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
                    <Table className="table-bordered table-hover align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: 5 }}>No.</th>
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((emp, key) => {
                          return (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <td>{emp.name}</td>
                              <td>
                                <Button color="success btn-sm" onClick={() => showFormUpdate(emp.id)}>
                                  Update
                                </Button>
                                <Button color="danger btn-sm" onClick={() => showFormUpdate(emp.id)}>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Roles;
