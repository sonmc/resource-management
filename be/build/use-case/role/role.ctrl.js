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
const role_flow_1 = __importDefault(require("./role.flow"));
const role_service_1 = require("service/role.service");
class RoleCtrl {
    list(ctx, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const flow = new role_flow_1.default(new role_service_1.RoleService());
            const result = yield flow.getAll();
            ctx.body = result;
        });
    }
}
exports.default = new RoleCtrl();
