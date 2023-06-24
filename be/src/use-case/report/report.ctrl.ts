import * as Koa from 'koa';
import ReportFlow from './report.flow';
import { ACCESS_TOKEN } from '../../util/const.variable';
import { TaskService } from '../../service/task.service';
import { UserService } from '../../service/user.service';

class ReportCtrl {
    static flow: any;
    constructor() {
        ReportCtrl.flow = new ReportFlow(new TaskService(), new UserService());
    }
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const start_date = ctx.query.start_date;
        const end_date = ctx.query.end_date;
        const result = await ReportCtrl.flow.list(start_date, end_date);
        if (result) {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new ReportCtrl();
