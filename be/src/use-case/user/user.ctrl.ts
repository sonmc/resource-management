import { WorkspaceService } from './../../service/workspace.service';
import * as Koa from 'koa';
import { UserService } from '../../service/user.service';
import UserFlow from './user.flow';
import { applySort, applyPagination } from '../../util/ctrl.util';
import { PagingPresenter } from './paging.presenter';
import { UserPresenter } from './user.presenter';
import { ACCESS_TOKEN } from '../../util/const.variable';

class UserCtrl {
    static flow: any;
    constructor() {
        UserCtrl.flow = new UserFlow(new UserService(), new WorkspaceService());
    }
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const { limit, page } = ctx.request.body as PagingPresenter;
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const param = { access_token };
        const { status, result } = await UserCtrl.flow.list(param);
        const data = applySort('id', 'asc', result);
        const response = applyPagination(limit, page, data);
        if (status === 'success') {
            ctx.body = response;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async create(ctx: Koa.Context, _next: Koa.Next) {
        const user = ctx.request.body as UserPresenter;
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await UserCtrl.flow.create(user, access_token);
        if (status === 'success') {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async getCurrentUser(ctx: Koa.Context, _next: Koa.Next) {
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        if (!access_token) {
            ctx.status = 400;
            ctx.body = 'Invalid token';
        } else {
            const user = await UserCtrl.flow.getCurrentUser(access_token);
            if (user) {
                ctx.body = user;
            } else {
                ctx.status = 400;
                ctx.body = 'Invalid token';
            }
        }
    }
}

export default new UserCtrl();
