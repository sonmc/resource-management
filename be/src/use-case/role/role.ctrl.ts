import * as Koa from 'koa';
import GetAllFlow from './get-all.flow';
import { RoleService } from 'service/role.service';

async function getAll(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new GetAllFlow(new RoleService());
    const result = await flow.getAll();
    ctx.body = result;
}
export { getAll };
