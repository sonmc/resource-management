import * as Koa from 'koa';
import GetAllFlow from './role.flow';
import { RoleService } from '../../service/role.service';

class RoleCtrl {
    async list(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new GetAllFlow(new RoleService());
        const result = await flow.getAll();
        ctx.body = result;
    }
}

export default new RoleCtrl();
