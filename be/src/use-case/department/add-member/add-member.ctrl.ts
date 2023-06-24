import * as Koa from 'koa';
import { DepartmentUserService } from '../../../service/department_user.service';
import AddMemberFlow from './add-member.flow';

class AddMemberCtrl {
    async save(ctx: Koa.Context, _next: Koa.Next) {
        const payload = ctx.request.body;
        const flow = new AddMemberFlow(new DepartmentUserService());
        const { status, result } = await flow.addMember(payload);
        if (status === 'success') {
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'Invalid status';
        }
    }
}

export default new AddMemberCtrl();
