import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
import { useUserActions } from "../../Recoil/actions/user.actions";
import ModalUpdate from "./FormUpdate";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [titleForm, setTitleForm] = useState("Create user");
  const [filter, setFilter] = useState({});
  const [isShowFormUpdate, setShowFormUpdate] = useState(false);
  const userAction = useUserActions();

  const fetchEmployee = () => {
    userAction.getAll().then((res) => {
      setEmployees(res);
    });
  };

  const showFormCreate = () => {
    setShowFormUpdate(!isShowFormUpdate);
  };
  const closeFormUpdate = () => {
    setShowFormUpdate(false);
  };

  const save = (employee) => {
    if (employee.id) {
      userAction.update(employee.id, employee);
    } else {
      userAction.create(employee);
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
          <BreadCrumb title="Employees" pageTitle="Tables" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Button color="success" outline onClick={() => showFormCreate()}>
                      Create
                    </Button>
                    <Table className="align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Role</th>
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
                              <td>
                                <span className="badge bg-success">active</span>
                              </td>
                              <td></td>
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
          <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} titleForm={titleForm} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Employees;
