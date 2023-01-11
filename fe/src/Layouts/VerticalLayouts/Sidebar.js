import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//Import Components
import HorizontalLayout from "../HorizontalLayout";
import { Container } from "reactstrap";

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
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
