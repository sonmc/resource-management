import React from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Table, CardHeader, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
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
            weeks: [
              {
                weekId: 1,
                value: "100",
              },
              {
                weekId: 2,
                value: "100",
              },
              {
                weekId: 3,
                value: "100",
              },
              {
                weekId: 4,
                value: "100",
              },
            ],
          },
          {
            weeks: [
              {
                weekId: 5,
                value: "100",
              },
              {
                weekId: 6,
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
            weeks: [
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
        name: "Lê Đạt2",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            weeks: [
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
            weeks: [
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
            weeks: [
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
    ],
  },
  {
    id: 1,
    projectName: "Vinmec",
    members: [
      {
        name: "SonMc",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            weeks: [
              {
                weekId: 1,
                value: "50",
              },
              {
                weekId: 2,
                value: "50",
              },
              {
                weekId: 3,
                value: "100",
              },
              {
                weekId: 4,
                value: "100",
              },
            ],
          },
          {
            weeks: [
              {
                weekId: 5,
                value: "100",
              },
              {
                weekId: 6,
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
            weeks: [
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
        name: "Lê Đạt2",
        role: "Dev",
        notes: "Some comment for this project",
        workloads: [
          {
            weeks: [
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
            weeks: [
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
            weeks: [
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
    ],
  },
];
const Projects = () => {
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <MetaTags>
          <title>Resource management | Projects</title>
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
                          <th>Project name</th>
                          <th>Members</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((x, key) => (
                          <React.Fragment key={x.id}>
                            <tr>
                              <td rowSpan={x.members.length} style={{ position: "relative" }}>
                                <Link to="#" className="link-success fs-100" style={{ position: "absolute", top: "-10px", right: "0px" }}>
                                  <i className="ri-add-box-fill" style={{ fontSize: "45px" }} />
                                </Link>

                                {x.projectName}
                              </td>
                              <td style={{ position: "relative" }}>
                                <Link to="#" className="link-danger fs-15" style={{ position: "absolute", top: 0, right: 0 }}>
                                  <i className="ri-indeterminate-circle-line" />
                                </Link>
                                {x.members[0].name}
                              </td>
                              <td>{x.members[0].role}</td>
                              {x.members[0].workloads.map((z, key3) => {
                                return z.weeks.map((w, key4) => {
                                  return (
                                    <td style={{ background: "green", fontWeight: 700, textAlign: "center" }} key={key3 + key4}>
                                      {w.value} %
                                    </td>
                                  );
                                });
                              })}
                            </tr>
                            {x.members.map((y, key2) => {
                              return key2 > 0 ? (
                                <tr>
                                  <td key={key2} style={{ position: "relative" }}>
                                    <Link to="#" className="link-danger fs-15" style={{ position: "absolute", top: 0, right: 0 }}>
                                      <i className="ri-indeterminate-circle-line" />
                                    </Link>
                                    {y.name}
                                  </td>
                                  <td key={key2}>{y.role}</td>
                                  {y.workloads.map((z, key3) => {
                                    return z.weeks.map((w, key4) => {
                                      return (
                                        <td style={{ background: "green", fontWeight: 700, textAlign: "center" }} key={key3 + key4}>
                                          {w.value} %
                                        </td>
                                      );
                                    });
                                  })}
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
