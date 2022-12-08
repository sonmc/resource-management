import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const NonAuthLayout = ({ children }) => {
  useEffect(() => {
    document.body.setAttribute("data-layout-mode", "light");
  }, []);
  return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
