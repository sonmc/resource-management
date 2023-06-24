import * as Koa from 'koa';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { AuthPresenter } from './auth.presenter';
import { AuthFlow } from './auth.flow';
import { authValidate } from './auth.validator';
import { applySort } from '../../util/ctrl.util';

export class AuthCtrl {
    async login(ctx: Koa.Context, _next: Koa.Next) {
        const { username, password } = ctx.request.body as AuthPresenter;
        const validation = await authValidate({ username, password });
        if (validation.status == 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        const flow = new AuthFlow(new AuthService(), new UserService());
        const { status, result } = await flow.login(username, password);
        if (status == 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        } else {
            const { accessToken, refreshToken } = result;
            ctx.cookies.set('access-token', accessToken, { httpOnly: true });
            ctx.cookies.set('refresh-token', refreshToken, { httpOnly: true });
            ctx.body = 'success!';
        }
    }

    async refreshToken(ctx: Koa.Context, _next: Koa.Next) {
        const refresh_token = ctx.cookies.get('refresh-token') || '';
        if (!refresh_token) {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        const flow = new AuthFlow(new AuthService(), new UserService());
        const { status, result } = await flow.refreshToken(refresh_token);
        if (status === 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        }
        ctx.cookies.set('access-token', result, {
            httpOnly: true,
        });
        ctx.body = 'success!';
    }

    async logout(ctx: Koa.Context, _next: Koa.Next) {
        ctx.cookies.set('access-token', null, {
            httpOnly: true,
        });
        ctx.body = 'success!';
    }
}

export default new AuthCtrl();
