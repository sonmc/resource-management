import React, { useEffect } from "react";
import "./assets/scss/themes.scss";
//imoprt Route
import Route from "./Routes";

function App() {
  useEffect(() => {
    if (document.documentElement) document.documentElement.setAttribute("data-layout", "horizontal");
  }, []);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
