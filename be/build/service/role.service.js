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
exports.RoleService = void 0;
const role_schema_1 = require("service/schemas/role.schema");
const typeorm_1 = require("typeorm");
class RoleService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const roleRepo = typeorm_1.getRepository(role_schema_1.RoleSchema);
            const roles = yield roleRepo.find();
            return roles;
        });
    }
}
exports.RoleService = RoleService;
