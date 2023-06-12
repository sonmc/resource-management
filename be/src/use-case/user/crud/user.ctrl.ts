import * as Koa from 'koa';
import { UserService } from 'service/user.service';
import UserFlow from './user.flow';
import { order, paginated } from 'utils/ctrl.util';
import { PagingPresenter } from '../paging.presenter';

export async function getAll(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new UserFlow(new UserService());
    const { status, result } = await flow.getAllUser();
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

export default { getAll };
