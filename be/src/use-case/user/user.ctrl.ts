import * as Koa from 'koa';
import { UserService } from 'service/user.service';
import UserFlow from './user.flow';
import { order, paginated } from '@util/ctrl.util';
import { PagingPresenter } from './paging.presenter';

class UserCtrl {
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new UserFlow(new UserService());
        const param = {};
        const { status, result } = await flow.getAllUser(param);
        const { limit, page } = ctx.request.body as PagingPresenter;
        const data = order(result, 'name', 'asc');
        const response = paginated(limit, page, data);
        if (status === 'success') {
            ctx.body = response;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new UserCtrl();
