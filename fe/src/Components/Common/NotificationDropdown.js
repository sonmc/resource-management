import React, { useState } from 'react';
import { Col, Dropdown, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import VacationDetailModal from './VacationDetailModal';
//import images
import avatar3 from 'src/assets/images/users/avatar-3.jpg';

//SimpleBar
import SimpleBar from 'simplebar-react';
import { notificationAtom } from 'src/Recoil/states/notification';
import { useRecoilState, useRecoilValue } from 'recoil';
import moment from 'moment';
import { ChangeStatus } from 'src/Services/vacation.service';

const NotificationDropdown = () => {
    //Dropdown Toggle
    const [notifications, setNotifications] = useRecoilState(notificationAtom);
    const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
    const [isVacationDetail, setIsVacationDetail] = useState(false);
    const [notification, setNotification] = useState(false);
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
    const showDetail = (noti) => {
        setNotification(noti);
        setIsVacationDetail(true);
    };
    const onCloseClick = () => {
        setIsVacationDetail(false);
    };
    const onConfirm = (status) => {
        ChangeStatus({ status, vacation_id: notification.vacation_id })
            .then(() => {
                setNotifications((x) => {
                    return x.filter((x) => x.id !== notification.id);
                });
            })
            .catch()
            .finally(() => {
                onCloseClick();
            });
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={isNotificationDropdown} toggle={toggleNotificationDropdown} className="topbar-head-dropdown ms-1 header-item">
                <DropdownToggle type="button" tag="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
                    <i className="bx bx-bell fs-22"></i>
                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                        {notifications.length || ''}
                        <span className="visually-hidden">unread messages</span>
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
                                        Vacations {notifications.length > 0 ? `(${notifications.length})` : ''}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="py-2 ps-2">
                            {notifications.map((noti) => {
                                return (
                                    <SimpleBar style={{ maxHeight: '300px' }} className="pe-2" key={noti.id}>
                                        <div
                                            onClick={() => {
                                                showDetail(noti);
                                            }}
                                            className="text-reset notification-item d-block dropdown-item"
                                        >
                                            <div className="d-flex">
                                                <div className="flex-1">
                                                    <Link to="#" className="stretched-link">
                                                        <h6 className="mt-0 mb-1 fs-13 fw-semibold">{noti.title}</h6>
                                                    </Link>
                                                    <div className="fs-13 text-muted">
                                                        <p className="mb-1">{noti.content}</p>
                                                    </div>
                                                    <p className="mb-0 fs-11 fw-medium text-muted">
                                                        <span>
                                                            <i className="mdi mdi-clock-outline"></i> {moment(noti.created_at).fromNow()}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </SimpleBar>
                                );
                            })}
                        </TabPane>
                    </TabContent>
                </DropdownMenu>
            </Dropdown>
            <VacationDetailModal notification={notification} show={isVacationDetail} onConfirm={onConfirm} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default NotificationDropdown;
