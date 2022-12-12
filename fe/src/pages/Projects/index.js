import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Get, Create } from "../../Services/project.service";
import CreateModal from "./Create";
import AddMemberModal from "./AddMember";
import ConfirmDeleteModal from "./ConfirmDelete";

const weeks = ["w1", "w2", "w3", "w4", "w1", "w2", "w3", "w4", "w1", "w2", "w3", "w4"];
const Projects = () => {
  const [filter, setFilter] = useState({});
  const [isShowFormUpdate, setShowFormUpdate] = useState(false);
  const [isShowFormAddMember, setShowFormAddMember] = useState(false);
  const [isShowConfirmModal, setShowFormConfirmModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const showFormAddMember = () => {
    setShowFormAddMember(!isShowFormAddMember);
  };

  const closeFormAddMember = () => {
    setShowFormAddMember(false);
  };

  const showFormCreate = () => {
    setShowFormUpdate(!isShowFormUpdate);
  };

  const closeFormUpdate = () => {
    setShowFormUpdate(false);
  };

  const showConfirmDeleteModal = () => {
    setShowFormConfirmModal(!isShowConfirmModal);
  };

  const closeConfirmDelete = () => {
    setShowFormConfirmModal(false);
  };

  const save = (project) => {
    Create(project);
  };

  const addMember = () => {};

  const remove = () => {
    setShowFormConfirmModal(false);
  };

  const fetchProject = (filter) => {
    Get(filter).then((res) => {
      setProjects(res);
    });
  };

  useEffect(() => {
    fetchProject(filter);
  }, [filter]);

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <MetaTags>
          <title>Resource management | Projects</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Button color="success" onClick={() => showFormCreate()}>
                    Create new
                  </Button>
                  <div className="table-responsive mt-3">
                    <Table className="align-middle table-nowrap mb-0 table-bordered">
                      <thead>
                        <tr>
                          <th rowSpan="2" style={{ textAlign: "center" }}>
                            Project name
                          </th>
                          <th rowSpan="2" style={{ textAlign: "center" }}>
                            Notes
                          </th>
                          <th rowSpan="2" style={{ textAlign: "center" }}>
                            Members
                          </th>
                          <th rowSpan="2" style={{ textAlign: "center" }}>
                            Role
                          </th>
                          <th colSpan="4" style={{ textAlign: "center" }}>
                            Month 1
                          </th>
                          <th colSpan="4" style={{ textAlign: "center" }}>
                            Month 2
                          </th>
                          <th colSpan="4" style={{ textAlign: "center" }}>
                            Month 3
                          </th>
                        </tr>

                        <tr>
                          {weeks.map((w, key) => {
                            return (
                              <React.Fragment key={key}>
                                <th style={{ textAlign: "center" }}>{w}</th>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((x, key) => (
                          <React.Fragment key={x.id}>
                            <tr>
                              <th rowSpan={x.users.length} style={{ position: "relative" }}>
                                <Link to="#" onClick={() => showFormAddMember()} className="link-success fs-100" style={{ position: "absolute", top: "-10px", right: "0px" }}>
                                  <i className="ri-add-box-fill" style={{ fontSize: "40px" }} />
                                </Link>
                                {x.name}
                              </th>
                              <td rowSpan={x.users.length} style={{ position: "relative" }}>
                                {x.note}
                              </td>
                              <td style={{ position: "relative" }}>
                                <Link to="#" className="link-danger fs-15" onClick={() => showConfirmDeleteModal()} style={{ position: "absolute", top: 0, right: 0 }}>
                                  <i className="ri-indeterminate-circle-line" style={{ fontSize: "20px" }} />
                                </Link>
                                {x.users[0].name}
                              </td>
                              <td style={{ textAlign: "center" }}>{x.users[0].role?.name}</td>
                              {x.users[0].workloads.map((z, key3) => {
                                return (
                                  <td style={{ textAlign: "center" }} key={key3}>
                                    {z.value} {z.value && <span>%</span>}
                                  </td>
                                );
                              })}
                            </tr>
                            {x.users.map((y, key2) => {
                              return key2 > 0 ? (
                                <tr>
                                  <td key={key2} style={{ position: "relative" }}>
                                    <Link to="#" className="link-danger fs-15" onClick={() => showConfirmDeleteModal()} style={{ position: "absolute", top: 0, right: 0 }}>
                                      <i className="ri-indeterminate-circle-line" style={{ fontSize: "20px" }} />
                                    </Link>
                                    {y.name}
                                  </td>
                                  <td style={{ textAlign: "center" }} key={key2}>
                                    {y.role?.name}
                                  </td>
                                  {y.workloads.map((z, key3) => {
                                    return (
                                      <td style={{ textAlign: "center" }} key={key3}>
                                        {z.value} {z.value && <span>%</span>}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ) : (
                                ""
                              );
                            })}
                            <tr>
                              <th colSpan={4}>Total</th>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <CreateModal save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} />
          <AddMemberModal save={addMember} isShowFormAddMember={isShowFormAddMember} closeFormAddMember={closeFormAddMember} />
          <ConfirmDeleteModal confirmed={remove} isShowConfirmModal={isShowConfirmModal} closeConfirmDelete={closeConfirmDelete} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Projects;
