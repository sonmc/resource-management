import React from 'react';
import { Redirect } from 'react-router-dom';
import Cover404 from '../pages/Authentication/Errors/Cover404';
import Error500 from '../pages/Authentication/Errors/Error500';
import Login from '../pages/Authentication/Login';
import Employees from '../pages/Employees';
import Projects from '../pages/Projects';
import ProjectDetail from '../pages/Projects/ProjectManage';
import Roles from '../pages/Roles';
import WorkSchedulePage from '../pages/WorkSchedule';
import TaskDetails from '../pages/Projects/ProjectManage/TaskDetails';
import Home from '../pages/Home';
import Lunch from '../pages/Lunch';
import NewManagement from '../pages/NewManagement';
import CreateNewManagement from '../pages/NewManagement/Create';
import CandidatePage from '../pages/Candidate';
import CandidateForm from '../pages/Candidate/FormUpdate';
import Profile from '../pages/Profile';
import Settings from '../pages/Profile/Setting';
import Introduction from '../pages/Introduction';
import Libraries from '../pages/Libraries';
import Vacations from '../pages/Vacations';

const authProtectedRoutes = [
    { path: '/projects', component: Projects },
    { path: '/projects/:id', component: ProjectDetail },
    { path: '/tasks-details', component: TaskDetails },
    { path: '/employees', component: Employees },
    { path: '/work-schedule', component: WorkSchedulePage },
    { path: '/roles', component: Roles },
    { path: '/home', component: Home },
    { path: '/introduction', component: Introduction },
    { path: '/lunch-order', component: Lunch },
    { path: '/new-management', component: NewManagement },
    { path: '/new-management/add', component: CreateNewManagement },
    { path: '/new-management/edit/:id', component: CreateNewManagement },
    { path: '/candidates', component: CandidatePage },
    { path: '/candidates/add', component: CandidateForm },
    { path: '/candidates/edit/:id', component: CandidateForm },
    { path: '/profile', component: Profile },
    { path: '/profile/setting', component: Settings },
    { path: '/libraries', component: Libraries },
    { path: '/vacations', component: Vacations },
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/home" />,
    },
];

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/auth-404-cover', component: Cover404 },
    { path: '/auth-500', component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
