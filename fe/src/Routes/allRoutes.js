import React from 'react';
import { Redirect } from 'react-router-dom';

//Tables
import BasicTables from '../pages/Tables/BasicTables/BasicTables';
import GridTables from '../pages/Tables/GridTables/GridTables';

//pages

import Cover404 from '../pages/Authentication/Errors/Cover404';
import Error500 from '../pages/Authentication/Errors/Error500';
//login
import Login from '../pages/Authentication/Login';
import Employees from '../pages/Employees';
import Projects from '../pages/Projects';

const authProtectedRoutes = [
    { path: '/tables-basic', component: BasicTables },
    { path: '/tables-gridjs', component: GridTables },
    { path: '/projects', component: Projects },
    { path: '/employees', component: Employees },

    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/projects" />,
    },
];

const publicRoutes = [
    // Authentication Page
    { path: '/login', component: Login },
    { path: '/auth-404-cover', component: Cover404 },
    { path: '/auth-500', component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
