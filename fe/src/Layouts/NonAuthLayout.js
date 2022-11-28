import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

const NonAuthLayout = ({ children }) => {
  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  useEffect(() => {
    document.body.setAttribute("data-layout-mode", "light");
  }, [layoutModeType]);
  return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
