import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import { Logout } from '../../Services/auth.service';

const ProfileDropdown = () => {
    const history = useHistory();
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const logout = () => {
        Logout();
        localStorage.removeItem('currentUser');
        history.push('/login');
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{currentUser.full_name}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{currentUser.roles.filter((x, i) => i === 0)}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome Anna!</h6>
                    <DropdownItem>
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span>
                    </DropdownItem>

                    <DropdownItem onClick={logout}>
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle" data-key="t-logout">
                            Logout
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;
