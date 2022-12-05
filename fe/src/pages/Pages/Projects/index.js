import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Table,
  CardHeader,
} from "reactstrap";
import MetaTags from "react-meta-tags";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <MetaTags>
          <title>Resource management | Project management</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Projects" pageTitle="Tables" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0 flex-grow-1">
                    Default Tables
                  </h4>
                </CardHeader>

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
                              View More{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <Link to="#" className="fw-medium">
                              #VZ2109
                            </Link>
                          </th>
                          <td>Christopher Neal</td>
                          <td>October 7, 2021</td>
                          <td>$5,500</td>
                          <td>
                            <Link to="#" className="link-success">
                              View More{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <Link to="#" className="fw-medium">
                              #VZ2108
                            </Link>
                          </th>
                          <td>Monkey Karry</td>
                          <td>October 5, 2021</td>
                          <td>$2,420</td>
                          <td>
                            <Link to="#" className="link-success">
                              View More{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <Link to="#" className="fw-medium">
                              #VZ2107
                            </Link>
                          </th>
                          <td>James White</td>
                          <td>October 2, 2021</td>
                          <td>$7,452</td>
                          <td>
                            <Link to="#" className="link-success">
                              View More{" "}
                              <i className="ri-arrow-right-line align-middle"></i>
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

export default Projects;
