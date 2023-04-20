import React, { useState } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import VacationDetailModal from './VacationDetailModal';
//import images
import avatar3 from 'src/assets/images/users/avatar-3.jpg';

//SimpleBar
import SimpleBar from 'simplebar-react';

const NotificationDropdown = () => {
    //Dropdown Toggle
    const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
    const [isVacationDetail, setIsVacationDetail] = useState(false);
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdown(!isNotificationDropdown);
    };

    //Tab
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const showDetail = () => {
        setIsVacationDetail(true);
    };
    const onCloseClick = () => {
        setIsVacationDetail(false);
    };
    const onAccept = () => {};
    const onReject = () => {};

    return (
        <React.Fragment>
            <Dropdown isOpen={isNotificationDropdown} toggle={toggleNotificationDropdown} className="topbar-head-dropdown ms-1 header-item">
                <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                    <i className="bx bx-bell fs-22"></i>
                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                        3<span className="visually-hidden">unread messages</span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                    <div className="dropdown-head bg-pattern rounded-top" style={{ backgroundColor: '#002f13' }}>
                        <div className="p-3">
                            <Row className="align-items-center">
                                <Col className="d-flex">
                                    <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                </Col>
                            </Row>
                        </div>

                        <div className="px-2 pt-0">
                            <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => {
                                            toggleTab('1');
                                        }}
                                    >
                                        All (4)
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => {
                                            toggleTab('2');
                                        }}
                                    >
                                        Vacations (4)
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="py-2 ps-2">
                            <SimpleBar style={{ maxHeight: '300px' }} className="pe-2">
                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                    <div className="d-flex">
                                        <div className="avatar-xs me-3">
                                            <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                <i className="bx bx-badge-check"></i>
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <Link to="#" className="stretched-link">
                                                <h6 className="mt-0 mb-2 lh-base">
                                                    Your <b>Elite</b> author Graphic Optimization <span className="text-secondary">reward</span> is ready!
                                                </h6>
                                            </Link>
                                            <p className="mb-0 fs-11 fw-medium text-muted">
                                                <span>
                                                    <i className="mdi mdi-clock-outline"></i> Just 30 sec ago
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-3 text-center">
                                    <button type="button" className="btn btn-soft-success waves-effect waves-light">
                                        View All Notifications <i className="ri-arrow-right-line align-middle"></i>
                                    </button>
                                </div>
                            </SimpleBar>
                        </TabPane>

                        <TabPane tabId="2" className="py-2 ps-2">
                            <SimpleBar style={{ maxHeight: '300px' }} className="pe-2">
                                <div
                                    onClick={() => {
                                        showDetail();
                                    }}
                                    className="text-reset notification-item d-block dropdown-item"
                                >
                                    <div className="d-flex">
                                        <img src={avatar3} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                        <div className="flex-1">
                                            <Link to="#" className="stretched-link">
                                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                                            </Link>
                                            <div className="fs-13 text-muted">
                                                <p className="mb-1">We talked about a project on linkedin.</p>
                                            </div>
                                            <p className="mb-0 fs-11 fw-medium text-muted">
                                                <span>
                                                    <i className="mdi mdi-clock-outline"></i> 30 min ago
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-3 text-center">
                                    <button type="button" className="btn btn-soft-success waves-effect waves-light">
                                        View All Messages <i className="ri-arrow-right-line align-middle"></i>
                                    </button>
                                </div>
                            </SimpleBar>
                        </TabPane>
                    </TabContent>
                </DropdownMenu>
            </Dropdown>
            <VacationDetailModal show={isVacationDetail} onAccept={onAccept} onReject={onReject} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default NotificationDropdown;
