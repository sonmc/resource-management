import * as Koa from 'koa';
import { WorkspaceFlow } from './workspace.flow';
import { applySort } from '../../util/ctrl.util';
import { WorkspaceService } from '../../service/workspace.service';
import { WorkspacePresenter } from './workspace.presenter';
import { UserService } from '../../service/user.service';

class WorkspaceCtrl {
    static flow: any;
    constructor() {
        WorkspaceCtrl.flow = new WorkspaceFlow(new WorkspaceService(), new UserService());
    }

    async list(ctx: Koa.Context, _next: Koa.Next) {
        const param = {};
        const { status, result } = await WorkspaceCtrl.flow.list(param);
        const data = applySort('id', 'asc', result);
        if (status === 'success') {
            ctx.body = data;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async create(ctx: Koa.Context, _next: Koa.Next) {
        const param = ctx.request.body as WorkspacePresenter;
        const { status, result } = await WorkspaceCtrl.flow.create(param);
        if (status === 'success') {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new WorkspaceCtrl();
