import React from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Table, CardHeader } from "reactstrap";
import MetaTags from "react-meta-tags";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
const Data = [
  {
    id: 1,
    projectName: "Kidsenglish",
    members: [
      {
        name: "Lê Đạt",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
      {
        name: "Lê Đạt2",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
      {
        name: "Lê Đạt3",
        role: "Dev",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    projectName: "Telehealth",
    members: [
      {
        name: "Lê Đạt",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
      {
        name: "Lê Đạt2",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
      {
        name: "Lê Đạt3",
        role: "Dev",
        workloads: [
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
          {
            value: "100",
          },
        ],
      },
    ],
  },
];
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
                <CardBody>
                  <div className="table-responsive">
                    <Table className="align-middle table-nowrap mb-0 table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Project name</th>
                          <th scope="col">Members</th>
                          <th scope="col">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((x, key) => (
                          <React.Fragment key={x.id}>
                            <tr>
                              <td scope="row" rowSpan={x.members.length}>
                                {x.projectName}
                              </td>
                              <td scope="row">{x.members[0].name}</td>
                              <td scope="row">{x.members[0].role}</td>
                              {x.members[0].workloads.map((z, key3) => (
                                <td scope="row" style={{ background: "green", fontWeight: 700 }} key={key3}>
                                  {z.value} %
                                </td>
                              ))}
                            </tr>
                            {x.members.map((y, key2) => {
                              return key2 > 0 ? (
                                <tr>
                                  <td scope="row" key={key2}>
                                    {y.name}
                                  </td>
                                  <td scope="row" key={key2}>
                                    {y.role}
                                  </td>
                                  {y.workloads.map((z, key3) => (
                                    <td scope="row" style={{ background: "green", fontWeight: 700 }} key={key3}>
                                      {z.value} %
                                    </td>
                                  ))}
                                </tr>
                              ) : (
                                ""
                              );
                            })}
                          </React.Fragment>
                        ))}
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
