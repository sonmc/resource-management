"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_routes = exports.post_routes = exports.get_routes = void 0;
const role_ctrl_1 = __importDefault(require("use-case/role/role.ctrl"));
const user_ctrl_1 = __importDefault(require("@use-case/user/user.ctrl"));
const auth_ctrl_1 = __importDefault(require("@use-case/auth/auth.ctrl"));
require("reflect-metadata");
const const_variable_1 = require("@util/const.variable");
const get_routes = [
    { name: JSON.stringify([const_variable_1.PROFILE_TYPE.ADMIN]), path: '/roles', ctrl: role_ctrl_1.default.list },
    { name: JSON.stringify([const_variable_1.PROFILE_TYPE.ADMIN]), path: '/users', ctrl: user_ctrl_1.default.list },
    { name: '[]', path: '/auth/refresh-token', ctrl: auth_ctrl_1.default.refreshToken },
    { name: '[]', path: '/auth/logout', ctrl: auth_ctrl_1.default.logout },
];
exports.get_routes = get_routes;
const post_routes = [{ name: '[]', path: '/auth/login', ctrl: auth_ctrl_1.default.login }];
exports.post_routes = post_routes;
const delete_routes = [{ name: JSON.stringify([const_variable_1.PROFILE_TYPE.ADMIN]), path: '/users', ctrl: auth_ctrl_1.default.login }];
exports.delete_routes = delete_routes;
