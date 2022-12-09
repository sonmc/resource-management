import React from "react";
import { Redirect } from "react-router-dom";

//pages

import Cover404 from "../pages/Authentication/Errors/Cover404";
import Error500 from "../pages/Authentication/Errors/Error500";
//login
import Login from "../pages/Authentication/Login";
import Employees from "../pages/Employees";
import Projects from "../pages/Projects";
import Roles from "../pages/Roles";

const authProtectedRoutes = [
  { path: "/projects", component: Projects },
  { path: "/employees", component: Employees },
  { path: "/roles", component: Roles },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/projects" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: Login },
  { path: "/auth-404-cover", component: Cover404 },
  { path: "/auth-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
