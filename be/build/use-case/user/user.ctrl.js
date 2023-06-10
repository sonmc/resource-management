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
exports.getAllUser = exports.getCurrentUser = void 0;
const user_service_1 = require("service/user.service");
const user_presenter_1 = require("./user.presenter");
const user_flow_1 = require("./user.flow");
function getCurrentUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const flow = new user_flow_1.UserFlow(new user_service_1.UserService());
        const access_token = req.cookies['access-token'];
        const { status, result } = yield flow.getCurrentUser(access_token);
        const userPresenter = new user_presenter_1.UserPresenter(result);
        res.json(userPresenter);
    });
}
exports.getCurrentUser = getCurrentUser;
function getAllUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const flow = new user_flow_1.UserFlow(new user_service_1.UserService());
        const { status, result } = yield flow.getAllUser();
        const users = result.map((u) => {
            return new user_presenter_1.UserPresenter(u);
        });
        res.json(users);
    });
}
exports.getAllUser = getAllUser;
