import * as Koa from 'koa';
import { getAll as getRoles } from 'use-case/role/role.ctrl';
import { getAll as getUsers } from 'use-case/user/crud/user.ctrl';
import authCtrl from '@use-case/auth/auth.ctrl';
import 'reflect-metadata';

type RouteItem = {
    path: string;
    ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};
const get_routes: RouteItem[] = [
    { path: '/roles', ctrl: getRoles },
    { path: '/users', ctrl: getUsers },
    { path: '/auth/refresh-token', ctrl: authCtrl.refreshToken },
    { path: '/auth/logout', ctrl: authCtrl.logout },
];

const post_routes: RouteItem[] = [{ path: '/auth/login', ctrl: authCtrl.login }];
const delete_routes: RouteItem[] = [{ path: '/users', ctrl: authCtrl.login }];
export { get_routes, post_routes, delete_routes };
