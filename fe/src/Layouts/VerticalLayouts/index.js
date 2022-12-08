import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

//import actions
import { layoutActions } from "../../store/actions";
import { layoutSelector } from "../../store/selector";

//redux
import { useSelector, useDispatch } from "react-redux";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch();

  const layoutType = useSelector(layoutSelector.layoutType);

  useEffect(() => {
    if (layoutType) {
      dispatch(layoutActions.changeLayout(layoutType));
    }
  }, [layoutType, dispatch]);

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
