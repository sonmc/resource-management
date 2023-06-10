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
exports.refreshToken = exports.logout = exports.login = void 0;
const auth_service_1 = require("service/auth.service");
const auth_flow_1 = require("./auth.flow");
const user_service_1 = require("service/user.service");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const flow = new auth_flow_1.AuthFlow(new user_service_1.UserService(), new auth_service_1.AuthService());
        const { status, result } = yield flow.login(username, password);
        if (status == 'error') {
            res.sendStatus(401);
        }
        else {
            res.cookie('access-token', result.accessToken);
            res.cookie('refresh-token', result.refreshToken);
            res.sendStatus(200);
        }
    });
}
exports.login = login;
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie('access-token', null);
        res.sendStatus(200);
    });
}
exports.logout = logout;
function refreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const flow = new auth_flow_1.AuthFlow(new user_service_1.UserService(), new auth_service_1.AuthService());
        const refresh_token = req.cookies['refresh-token'];
        const { status, result } = yield flow.refreshToken(refresh_token);
        res.cookie('access-token', result.accessToken);
        res.sendStatus(200);
    });
}
exports.refreshToken = refreshToken;
