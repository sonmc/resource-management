import React from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Table, CardHeader } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import UiContent from '../../Components/Common/UiContent';
const Data = [
    {
        projectName: 'Kidsenglish',
        members: [
            {
                name: 'Lê Đạt',
                role: 'Dev',
                workloads: [
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                ],
            },
            {
                name: 'Lê Đạt2',
                role: 'Dev',
                workloads: [
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                ],
            },
            {
                name: 'Lê Đạt3',
                role: 'Dev',
                workloads: [
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
                    },
                    {
                        value: '100',
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
                                <CardHeader>
                                    <h4 className="card-title mb-0 flex-grow-1">Default Tables</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Project</th>
                                                    <th scope="col">Members</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Data.map((x, key) => (
                                                    <>
                                                        <tr>
                                                            <th scope="row" rowSpan={x.members.length}>
                                                                {x.projectName}
                                                            </th>
                                                            <th scope="row">{x.members[0].name}</th>
                                                            {x.members[0].workloads.map((z, key3) => (
                                                                <th scope="row" key={key3}>
                                                                    {z.value}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                        {x.members.map((y, key2) => {
                                                            return key2 > 0 ? (
                                                                <tr>
                                                                    <th scope="row" key={key2}>
                                                                        {y.name}
                                                                    </th>
                                                                    {y.workloads.map((z, key3) => (
                                                                        <th scope="row" key={key3}>
                                                                            {z.value}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            ) : (
                                                                ''
                                                            );
                                                        })}
                                                    </>
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
