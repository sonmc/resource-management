import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
  const history = useHistory();

  const [isTables, setIsTables] = useState(false);
  const [isHomes, setIsHomes] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Homes");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id)) document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Homes") {
      setIsHomes(false);
    }
  }, [history, isTables, iscurrentState]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "homes",
      label: "Homes",
      icon: "ri-honour-line",
      link: "/home",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Homes");
      },
    },
    {
      id: "tables",
      label: "Tables",
      icon: "ri-layout-grid-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsTables(!isTables);
        setIscurrentState("Tables");
        updateIconSidebar(e);
      },
      stateVariables: isTables,
      subItems: [
        { id: "basictables", label: "Basic Tables", link: "/tables-basic", parentId: "tables" },
        { id: "gridjs", label: "Grid Js", link: "/tables-gridjs", parentId: "tables" },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
