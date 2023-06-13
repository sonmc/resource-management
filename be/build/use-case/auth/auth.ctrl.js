"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCtrl = void 0;
const auth_service_1 = require("service/auth.service");
const user_service_1 = require("service/user.service");
const auth_flow_1 = require("./auth.flow");
const auth_validator_1 = require("./auth.validator");
class AuthCtrl {
    constructor() {
        this.flow = new auth_flow_1.AuthFlow(new auth_service_1.AuthService(), new user_service_1.UserService());
    }
    login(ctx, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = ctx.request.body;
            const validation = yield auth_validator_1.authValidate({ username, password });
            if (validation.status == 'error') {
                ctx.status = 400;
                ctx.body = 'bad request!';
            }
            const { status, result } = yield this.flow.login(username, password);
            if (status == 'error') {
                ctx.status = 400;
                ctx.body = 'bad request!';
            }
            else {
                const { accessToken, refreshToken } = result;
                ctx.cookies.set('access-token', accessToken, { httpOnly: true });
                ctx.cookies.set('refresh-token', refreshToken, { httpOnly: true });
                ctx.body = 'success!';
            }
        });
    }
    refreshToken(ctx, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh_token = ctx.cookies.get('refresh-token') || '';
            if (!refresh_token) {
                ctx.status = 400;
                ctx.body = 'bad request!';
            }
            const { status, result } = yield this.flow.refreshToken(refresh_token);
            if (status === 'error') {
                ctx.status = 400;
                ctx.body = 'bad request!';
            }
            ctx.cookies.set('access-token', result, {
                httpOnly: true,
            });
            ctx.body = 'success!';
        });
    }
    logout(ctx, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.cookies.set('access-token', null, {
                httpOnly: true,
            });
        });
    }
}
exports.AuthCtrl = AuthCtrl;
exports.default = new AuthCtrl();
