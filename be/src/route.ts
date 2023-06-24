import * as Koa from 'koa';
import roleCtrl from './use-case/role/role.ctrl';
import userCtrl from './use-case/user/user.ctrl';
import authCtrl from './use-case/auth/auth.ctrl';
import taskCtrl from './use-case/task/task.ctrl';
import { PROFILE_TYPE } from './util/const.variable';
import workspaceCtrl from './use-case/workspace/workspace.ctrl';
import departmentCtrl from './use-case/department/department.ctrl';
import addMemberCtrl from './use-case/department/add-member/add-member.ctrl';
import reportCtrl from './use-case/report/report.ctrl';
// scp /Users/macbook/Desktop/Projects/nhatrang_demo/be/dist root@61.14.233.220:/home/sonmc/be/

// scp -P 2018 -r /Users/macbook/Desktop/Projects/nhatrang_demo/fe/build root@61.14.233.220:/home/sonmc/react_app/build

type RouteItem = {
    path: string;
    name: string;
    ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
    {
        name: '[]',
        path: '/users/get-current-user',
        ctrl: userCtrl.getCurrentUser,
    },
    { name: '[]', path: '/auth/refresh-token', ctrl: authCtrl.refreshToken },
    { name: '[]', path: '/auth/logout', ctrl: authCtrl.logout },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/roles',
        ctrl: roleCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN_DEPARTMENT]),
        path: '/reports',
        ctrl: reportCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: userCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/workspaces',
        ctrl: workspaceCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/departments',
        ctrl: departmentCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.STAFF]),
        path: '/tasks',
        ctrl: taskCtrl.list,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.STAFF]),
        path: '/tasks/details',
        ctrl: taskCtrl.get,
    },
    // {
    //     name: JSON.stringify([PROFILE_TYPE.STAFF]),
    //     path: '/tasks?taskId/:id',
    //     ctrl: taskCtrl.get,
    // },
];

const post_routes: RouteItem[] = [
    { name: '[]', path: '/auth/login', ctrl: authCtrl.login },
    {
        name: JSON.stringify([PROFILE_TYPE.SUPPER_ADMIN, PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: userCtrl.create,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/workspaces',
        ctrl: workspaceCtrl.create,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/departments',
        ctrl: departmentCtrl.create,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/departments/add-member',
        ctrl: addMemberCtrl.save,
    },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/tasks',
        ctrl: taskCtrl.create,
    },
];
const delete_routes: RouteItem[] = [
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: authCtrl.login,
    },
];

export { get_routes, post_routes, delete_routes };
