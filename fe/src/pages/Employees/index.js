/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Table, CardHeader } from "reactstrap";
import MetaTags from "react-meta-tags";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
import { employeeActions, employeeSelector } from "../../store/employee/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Employees = () => {
  const dispatch = useDispatch();
  const filterEmployee = useSelector(employeeSelector.filter);
  debugger;
  useEffect(() => {
    dispatch(employeeActions.getEmployee());
  }, [filterEmployee]);

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
                    <Table className="align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Invoice</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <Link to="#" className="fw-medium">
                              #VZ2110
                            </Link>
                          </th>
                          <td>Bobby Davis</td>
                          <td>October 15, 2021</td>
                          <td>$2,300</td>
                          <td>
                            <Link to="#" className="link-success">
                              View More <i className="ri-arrow-right-line align-middle"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Employees;
