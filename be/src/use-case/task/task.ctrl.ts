import * as Koa from 'koa';
import TaskFlow from './task.flow';
import { applySort } from '../../util/ctrl.util';
import { TaskPresenter } from './task.presenter';
import { TaskService } from '../../service/task.service';
import { UserService } from '../../service/user.service';
import { DepartmentService } from '../../service/department.service';
import { ACCESS_TOKEN } from '../../util/const.variable';

class TaskCtrl {
    async get(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new TaskFlow(new TaskService(), new UserService(), new DepartmentService());
        const taskId = ctx.query.id;
        const result = await flow.get({ taskId });

        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async list(ctx: Koa.Context, _next: Koa.Next) {
        const department_id = ctx.request.query.department_id;
        const flow = new TaskFlow(new TaskService(), new UserService(), new DepartmentService());
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await flow.list(department_id, access_token);
        const data = applySort('order', 'asc', result);
        const response = TaskPresenter.presentList(data);
        if (status === 'success') {
            ctx.body = response;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }

    async create(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new TaskFlow(new TaskService(), new UserService(), new DepartmentService());
        let task = ctx.request.body as TaskPresenter;
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await flow.create(task, access_token);
        const response = TaskPresenter.presentItem(result);
        if (status === 'success') {
            ctx.body = response;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new TaskCtrl();
