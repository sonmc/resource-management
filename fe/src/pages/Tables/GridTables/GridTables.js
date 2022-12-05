import React from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

// Import Table Data
import { BaseExample } from "./GridTablesData";

const GridTables = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Grid Js | Velzon - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Grid Js" pageTitle="Tables" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0 flex-grow-1">Base Example</h4>
                </CardHeader>

                <CardBody>
                  <div id="table-gridjs">
                    <BaseExample />
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

export default GridTables;
