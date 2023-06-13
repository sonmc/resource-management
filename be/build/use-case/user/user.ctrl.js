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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("service/user.service");
const user_flow_1 = __importDefault(require("./user.flow"));
const ctrl_util_1 = require("@util/ctrl.util");
class UserCtrl {
    list(ctx, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const flow = new user_flow_1.default(new user_service_1.UserService());
            const param = {};
            const { status, result } = yield flow.getAllUser(param);
            const { limit, page } = ctx.request.body;
            const data = ctrl_util_1.order(result, 'name', 'asc');
            const response = ctrl_util_1.paginated(limit, page, data);
            if (status === 'success') {
                ctx.body = response;
            }
            else {
                ctx.status = 400;
                ctx.body = 'Invalid status';
            }
        });
    }
}
exports.default = new UserCtrl();
