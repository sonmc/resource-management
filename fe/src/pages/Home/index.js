import React from 'react';
import { Container, CardBody, Card, CardHeader, Row, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import News from '../../Components/Home/New';
import CompanyMemberIntroduction from '../../Components/Home/CompanyMemberIntroduction';
import Handbook from '../../Components/Home/Handbook';
import { newFake } from './dataFake';

const HomePage = () => {
    const news = newFake;
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Lunch Order</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">News</h4>
                                <div className="flex-shrink-0">
                                    <UncontrolledDropdown className="card-header-dropdown">
                                        <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                            <span className="fw-semibold text-uppercase fs-12">Sort by: </span>
                                            <span className="text-muted">
                                                Last 30 Days<i className="mdi mdi-chevron-down ms-1"></i>
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                            <DropdownItem>Today</DropdownItem>
                                            <DropdownItem>Yesterday</DropdownItem>
                                            <DropdownItem>Last 7 Days</DropdownItem>
                                            <DropdownItem>Last 30 Days</DropdownItem>
                                            <DropdownItem>This Month</DropdownItem>
                                            <DropdownItem>Last Month</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <News news={news} />
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Handbook</h4>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <Handbook news={news} />
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Company and member introduction</h4>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <CompanyMemberIntroduction />
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
