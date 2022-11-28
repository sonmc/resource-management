import React from "react";
import { Redirect } from "react-router-dom";

//Tables
import BasicTables from "../pages/Tables/BasicTables/BasicTables";
import GridTables from "../pages/Tables/GridTables/GridTables";
import Home from "../pages/Pages/Home";

//pages

import CoverLockScreen from "../pages/Authentication/LockScreen/CoverLockScr";
import CoverTwosVerify from "../pages/Authentication/TwoStepVerification/CoverTwosVerify";
import Cover404 from "../pages/Authentication/Errors/Cover404";
import Error500 from "../pages/Authentication/Errors/Error500";
//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Register from "../pages/Authentication/Register";

const authProtectedRoutes = [
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-gridjs", component: GridTables },
  { path: "/home", component: Home },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: Register },

  //Authentication pages
  { path: "/auth-lockscreen-cover", component: CoverLockScreen },
  { path: "/auth-twostep-cover", component: CoverTwosVerify },
  { path: "/auth-404-cover", component: Cover404 },
  { path: "/auth-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
