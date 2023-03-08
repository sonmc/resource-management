import React from 'react';
import { Redirect } from 'react-router-dom';
import Cover404 from '../pages/Authentication/Errors/Cover404';
import Error500 from '../pages/Authentication/Errors/Error500';
import Login from '../pages/Authentication/Login';
import Employees from '../pages/Employees';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/Projects/ProjectManage/project-detail';
import Roles from '../pages/Roles';
import VacationCalendar from '../pages/VacationCalendar';
import Vacations from '../pages/VacationManage';
import TaskDetails from '../pages/Projects/ProjectManage/TaskDetails';
import TaskList from '../pages/Projects/ProjectManage/TaskList';

const authProtectedRoutes = [
    { path: '/projects', component: Projects },
    { path: '/project-detail', component: ProjectDetail },
    { path: '/apps-tasks-list-view', component: TaskList },
    { path: '/tasks-details', component: TaskDetails },
    { path: '/employees', component: Employees },
    { path: '/vacation-calendar', component: VacationCalendar },
    { path: '/vacations', component: Vacations },
    { path: '/roles', component: Roles },
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/projects" />,
    },
];

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/auth-404-cover', component: Cover404 },
    { path: '/auth-500', component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
