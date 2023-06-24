import * as Koa from 'koa';
import { DepartmentFlow } from './department.flow';
import { applySort } from '../../util/ctrl.util';
import { DepartmentService } from '../../service/department.service';
import { UserService } from '../../service/user.service';
import { ACCESS_TOKEN } from '../../util/const.variable';
import { DepartmentUserService } from '../../service/department_user.service';
import { DepartmentPresenter } from './department.presenter';

class DepartmentCtrl {
    static flow: any;
    constructor() {
        DepartmentCtrl.flow = new DepartmentFlow(new DepartmentService(), new UserService(), new DepartmentUserService());
    }
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await DepartmentCtrl.flow.list(access_token);
        const response = DepartmentPresenter.presentList(result);
        const data = applySort('id', 'asc', response);
        if (status === 'success') {
            ctx.body = data;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async create(ctx: Koa.Context, _next: Koa.Next) {
        const payload = ctx.request.body;
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await DepartmentCtrl.flow.create(payload, access_token);
        if (status === 'success') {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new DepartmentCtrl();
