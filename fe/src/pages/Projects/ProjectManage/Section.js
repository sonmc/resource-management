import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import OverviewTab from './Overview';
import TaskList from './TaskList';
import MeetingNote from './MeetingNote';
import ProjectIssues from './ProjectIssues';
import ProjectReport from './ProjectReport';

const Section = () => {
    //Tab
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    return (
        <React.Fragment>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <Row className="mb-3">
                                <div className="col-md">
                                    <Row className="align-items-center g-3">
                                        <div className="col-md">
                                            <h4 className="fw-bold">Kidsenglish</h4>
                                        </div>
                                    </Row>
                                </div>
                            </Row>

                            <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' }, 'fw-semibold')}
                                        onClick={() => {
                                            toggleTab('1');
                                        }}
                                        href="#"
                                    >
                                        Overview
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' }, 'fw-semibold')}
                                        onClick={() => {
                                            toggleTab('2');
                                        }}
                                        href="#"
                                    >
                                        Tasks
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' }, 'fw-semibold')}
                                        onClick={() => {
                                            toggleTab('3');
                                        }}
                                        href="#"
                                    >
                                        Meeting note
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '4' }, 'fw-semibold')}
                                        onClick={() => {
                                            toggleTab('4');
                                        }}
                                        href="#"
                                    >
                                        Issues
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '5' }, 'fw-semibold')}
                                        onClick={() => {
                                            toggleTab('5');
                                        }}
                                        href="#"
                                    >
                                        Report
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <TabContent activeTab={activeTab} className="text-muted">
                        <TabPane tabId="1">
                            <OverviewTab />
                        </TabPane>
                        <TabPane tabId="2">
                            <TaskList />
                        </TabPane>
                        <TabPane tabId="3">
                            <MeetingNote />
                        </TabPane>
                        <TabPane tabId="4">
                            <ProjectIssues />
                        </TabPane>
                        <TabPane tabId="5">
                            <ProjectReport />
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;
