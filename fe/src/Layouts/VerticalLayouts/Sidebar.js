import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//import logo
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

//Import Components
import HorizontalLayout from "../HorizontalLayout";
import { Container } from "reactstrap";

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="17" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="17" />
            </span>
          </Link>
        </div>
        <div id="scrollbar">
          <Container fluid>
            <ul className="navbar-nav" id="navbar-nav">
              <HorizontalLayout />
            </ul>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
