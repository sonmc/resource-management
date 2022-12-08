import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header headerClass={headerClass} />
        <Sidebar />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);
