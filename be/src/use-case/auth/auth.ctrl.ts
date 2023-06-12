import * as Koa from 'koa';
import { AuthService } from 'service/auth.service';

import { UserService } from 'service/user.service';
import { AuthPresenter } from './auth.presenter';
import { AuthFlow } from './auth.flow';

export class AuthCtrl {
    flow: any;
    constructor() {
        this.flow = new AuthFlow(new AuthService(), new UserService());
    }
    async login(ctx: Koa.Context, _next: Koa.Next) {
        const { username, password } = ctx.request.body as AuthPresenter;
        const { status, result } = await this.flow.login(username, password);
        if (status == 'error') {
            ctx.status = 400;
            ctx.body = 'bad request!';
        } else {
            const { accessToken, refreshToken } = result;
            ctx.cookies.set('access-token', accessToken, { httpOnly: true });
            ctx.cookies.set('refresh-token', refreshToken, { httpOnly: true });
            ctx.body = 'successfully!';
        }
    }

    async refreshToken(ctx: Koa.Context, _next: Koa.Next) {
        const refresh_token = ctx.cookies.get('refresh-token') || '';
        if (!refresh_token) {
            ctx.status = 401;
            ctx.body = 'authorization!';
        }
        const { status, result } = await this.flow.refreshToken(refresh_token);
        if (status === 'error') {
            ctx.status = 401;
            ctx.body = 'authorization!';
        }
        ctx.cookies.set('access-token', result, {
            httpOnly: true,
        });
        ctx.body = 'successfully!';
    }

    async logout(ctx: Koa.Context, _next: Koa.Next) {
        ctx.cookies.set('access-token', null, {
            httpOnly: true,
        });
    }
}

export default new AuthCtrl();
