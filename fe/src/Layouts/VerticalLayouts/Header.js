import React from 'react';
import { Link } from 'react-router-dom';

//import images
import logoDark from '../../assets/images/logo.png';

//import Components
import FullScreenDropdown from '../../Components/Common/FullScreenDropdown';
import ProfileDropdown from '../../Components/Common/ProfileDropdown';

const Header = ({ headerClass }) => {
    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <Link to="/" className="logo logo-dark">
                                    <span className="logo-lg">
                                        <img src={logoDark} style={{ width: '70%', height: '50%' }} alt="" height="17" />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <FullScreenDropdown />
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
