import React, { useCallback, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Collapse, Container } from 'reactstrap';
import logoSm from '../../assets/images/logo-sm.png';
//i18n
import { withTranslation } from 'react-i18next';

// Import Data
import navdata from '../VerticalLayouts/LayoutMenuData';

//SimpleBar
import SimpleBar from 'simplebar-react';

const TwoColumnLayout = (props) => {
    const navData = navdata().props.children;

    const activateParentDropdown = useCallback((item) => {
        item.classList.add('active');
        let parentCollapseDiv = item.closest('.collapse.menu-dropdown');
        if (parentCollapseDiv) {
            // to set aria expand true remaining
            parentCollapseDiv.classList.add('show');
            parentCollapseDiv.parentElement.children[0].classList.add('active');
            parentCollapseDiv.parentElement.children[0].setAttribute('aria-expanded', 'true');
            if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
                parentCollapseDiv.parentElement.closest('.collapse').classList.add('show');
                if (parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling) parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling.classList.add('active');
            }
            activateIconSidebarActive(parentCollapseDiv.getAttribute('id'));
            return false;
        }
        return false;
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const initMenu = () => {
            const pathName = process.env.PUBLIC_URL + props.location.pathname;
            const ul = document.getElementById('navbar-nav');
            const items = ul.getElementsByTagName('a');
            let itemsArray = [...items]; // converts NodeList to Array
            removeActivation(itemsArray);
            let matchingMenuItem = itemsArray.find((x) => {
                return x.pathname === pathName;
            });
            if (matchingMenuItem) {
                activateParentDropdown(matchingMenuItem);
            } else {
                if (process.env.PUBLIC_URL) {
                    var id = pathName.replace(process.env.PUBLIC_URL, '');
                    id = id.replace('/', '');
                } else {
                    id = pathName.replace('/', '');
                }
                if (id) document.body.classList.add('twocolumn-panel');
                activateIconSidebarActive(id);
            }
        };
        initMenu();
    }, [props.location.pathname, activateParentDropdown]);

    function activateIconSidebarActive(id) {
        var menu = document.querySelector("#two-column-menu .simplebar-content-wrapper a[subitems='" + id + "'].nav-icon");
        if (menu !== null) {
            menu.classList.add('active');
        }
    }

    const removeActivation = (items) => {
        let activeItems = items.filter((x) => x.classList.contains('active'));
        activeItems.forEach((item) => {
            if (item.classList.contains('menu-link')) {
                if (!item.classList.contains('active')) {
                    item.setAttribute('aria-expanded', false);
                }
                item.nextElementSibling.classList.remove('show');
            }
            if (item.classList.contains('nav-link')) {
                if (item.nextElementSibling) {
                    item.nextElementSibling.classList.remove('show');
                }
                item.setAttribute('aria-expanded', false);
            }
            item.classList.remove('active');
        });

        const ul = document.getElementById('two-column-menu');
        const iconItems = ul.getElementsByTagName('a');
        let itemsArray = [...iconItems];
        let activeIconItems = itemsArray.filter((x) => x.classList.contains('active'));
        activeIconItems.forEach((item) => {
            item.classList.remove('active');
            var id = item.getAttribute('subitems');
            if (document.getElementById(id)) document.getElementById(id).classList.remove('show');
        });
    };

    return (
        <React.Fragment>
            <div id="scrollbar">
                <Container fluid>
                    <div id="two-column-menu">
                        <SimpleBar className="twocolumn-iconview">
                            <Link to="#" className="logo">
                                <img src={logoSm} alt="" height="22" />
                            </Link>
                            {(navData || []).map((item, key) => (
                                <React.Fragment key={key}>
                                    {item.icon &&
                                        (item.subItems ? (
                                            <li>
                                                <Link onClick={item.click} to="#" subitems={item.id} className="nav-icon" data-bs-toggle="collapse">
                                                    <i className={item.icon}></i>
                                                </Link>
                                            </li>
                                        ) : (
                                            <>
                                                <Link onClick={item.click} to={item.link ? item.link : '/#'} subitems={item.id} className="nav-icon" data-bs-toggle="collapse">
                                                    <i className={item.icon}></i>
                                                </Link>
                                            </>
                                        ))}
                                </React.Fragment>
                            ))}
                        </SimpleBar>
                    </div>
                    <SimpleBar id="navbar-nav" className="navbar-nav">
                        {(navData || []).map((item, key) => (
                            <React.Fragment key={key}>
                                {item.subItems ? (
                                    <li className="nav-item">
                                        <Collapse className="menu-dropdown" isOpen={item.stateVariables} id={item.id}>
                                            <ul className="nav nav-sm flex-column test">
                                                {/* subItms  */}
                                                {item.subItems &&
                                                    (item.subItems || []).map((subItem, key) => (
                                                        <React.Fragment key={key}>
                                                            {!subItem.isChildItem ? (
                                                                <li className="nav-item">
                                                                    <Link to={subItem.link ? subItem.link : '/#'} className="nav-link">
                                                                        {props.t(subItem.label)}
                                                                    </Link>
                                                                </li>
                                                            ) : (
                                                                <li className="nav-item">
                                                                    <Link onClick={subItem.click} className="nav-link" to="/#" data-bs-toggle="collapse">
                                                                        {' '}
                                                                        {props.t(subItem.label)}
                                                                    </Link>
                                                                    <Collapse className="menu-dropdown" isOpen={subItem.stateVariables} id={item.id}>
                                                                        <ul className="nav nav-sm flex-column">
                                                                            {/* child subItms  */}
                                                                            {subItem.childItems &&
                                                                                (subItem.childItems || []).map((childItem, key) => (
                                                                                    <li className="nav-item" key={key}>
                                                                                        <Link to={childItem.link ? childItem.link : '/#'} className="nav-link">
                                                                                            {props.t(childItem.label)}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                        </ul>
                                                                    </Collapse>
                                                                </li>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                            </ul>
                                        </Collapse>
                                    </li>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </SimpleBar>
                </Container>
            </div>
        </React.Fragment>
    );
};

TwoColumnLayout.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
};

export default withRouter(withTranslation()(TwoColumnLayout));
