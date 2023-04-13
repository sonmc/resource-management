import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
//import logo
import logoSm from '../../assets/icons/logo.png';
import logoLight from '../../assets/images/logo-light.png';

//Import Components
import SidebarContent from './SidebarContent';
import { Container } from 'reactstrap';
import HorizontalLayout from '../HorizontalLayout';

const Sidebar = ({ layoutType }) => {
    useEffect(() => {
        var verticalOverlay = document.getElementsByClassName('vertical-overlay');
        if (verticalOverlay) {
            verticalOverlay[0].addEventListener('click', function () {
                document.body.classList.remove('vertical-sidebar-enable');
            });
        }
    });

    const addEventListenerOnSmHoverMenu = () => {
        // add listener Sidebar Hover icon on change layout from setting
        if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
        } else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        } else {
            document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
        }
    };

    return (
        <React.Fragment>
            <div className="app-menu navbar-menu">
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logoSm} alt="logo" style={{ width: '50%', height: '50%' }} />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLight} alt="logo" style={{ width: '100%', height: '50%' }} />
                        </span>
                    </Link>

                    <Link to="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoSm} alt="logo" style={{ width: '50%', height: '50%' }} />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLight} alt="logo" style={{ width: '100%', height: '50%' }} />
                        </span>
                    </Link>
                    <button onClick={addEventListenerOnSmHoverMenu} type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>
                {layoutType === 'horizontal' ? (
                    <div id="scrollbar">
                        <Container fluid>
                            <div id="two-column-menu"></div>
                            <ul className="navbar-nav" id="navbar-nav">
                                <HorizontalLayout />
                            </ul>
                        </Container>
                    </div>
                ) : (
                    <SimpleBar id="scrollbar" className="h-100">
                        <Container fluid>
                            <div id="two-column-menu"></div>
                            <ul className="navbar-nav" id="navbar-nav">
                                <SidebarContent layoutType={layoutType} />
                            </ul>
                        </Container>
                    </SimpleBar>
                )}
            </div>
            <div className="vertical-overlay"></div>
        </React.Fragment>
    );
};

export default Sidebar;
