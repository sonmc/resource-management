import * as Koa from 'koa';
import roleCtrl from './use-case/role/role.ctrl';
import userCtrl from './use-case/user/user.ctrl';
import authCtrl from './use-case/auth/auth.ctrl';
import { PROFILE_TYPE } from './util/const.variable';

type RouteItem = {
    path: string;
    name: string;
    ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
    { name: JSON.stringify([PROFILE_TYPE.ADMIN]), path: '/roles', ctrl: roleCtrl.list },
    { name: JSON.stringify([PROFILE_TYPE.ADMIN]), path: '/users', ctrl: userCtrl.list },
    { name: '[]', path: '/auth/refresh-token', ctrl: authCtrl.refreshToken },
    { name: '[]', path: '/auth/logout', ctrl: authCtrl.logout },
];

const post_routes: RouteItem[] = [{ name: '[]', path: '/auth/login', ctrl: authCtrl.login }];
const delete_routes: RouteItem[] = [{ name: JSON.stringify([PROFILE_TYPE.ADMIN]), path: '/users', ctrl: authCtrl.login }];

export { get_routes, post_routes, delete_routes };
