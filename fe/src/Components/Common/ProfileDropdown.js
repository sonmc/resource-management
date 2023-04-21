import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import avatar1 from 'src/assets/images/users/avatar-1.jpg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Logout } from 'src/Services/auth.service';
import { currentUserAtom } from 'src/Recoil/states/users';
const ProfileDropdown = () => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const [avatar, setAvatar] = useState(avatar1);
    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);
    const logout = () => {
        Logout();
        history.push('/login');
        setCurrentUser(null);
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img
                            className="rounded-circle header-profile-user"
                            src={avatar}
                            alt="Header Avatar"
                            onError={() => {
                                setAvatar(avatar1);
                            }}
                        />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{currentUser.full_name}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{currentUser.roles}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome Anna!</h6>
                    <DropdownItem
                        onClick={() => {
                            history.push('/profile');
                        }}
                    >
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
