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
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const user_schema_1 = require("service/schemas/user.schema");
const const_variable_1 = require("util/const.variable");
const users_roles_schema_1 = require("./schemas/users-roles.schema");
class UserService {
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(user_schema_1.UserSchema);
            const user = (yield userRepo.findOne({
                relations: ['roles', 'roles.permissions'],
                where: { username: username },
            }));
            if (user) {
                return { status: 'success', result: user };
            }
            else {
                return { status: 'error', result: new user_schema_1.UserSchema() };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(user_schema_1.UserSchema);
            const user = (yield userRepo.findOne(id));
            user.status = const_variable_1.STATUS_INACTIVE;
            const userCreated = yield userRepo.create(user);
            yield userRepo.save(userCreated);
        });
    }
    list(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = typeorm_1.getRepository(user_schema_1.UserSchema);
            const querySelecter = userRepo.createQueryBuilder('u');
            querySelecter.leftJoinAndSelect('u.roles', 'r').where('u.id != :id', { id: const_variable_1.ADMIN_ID });
            let users = null;
            try {
                const role_id = parseInt(param.roleId);
                if (role_id) {
                    querySelecter.andWhere('r.id = :id', { id: role_id });
                }
                if (param.status_level > 0) {
                    querySelecter.andWhere('u.status_level = :status_level', {
                        status: param.status_level,
                    });
                }
                if (param.status > 0) {
                    querySelecter.andWhere('u.status = :status', { status: param.status });
                }
                if (param.searchTerm) {
                    querySelecter.andWhere('u.username like :name', {
                        name: `%${param.searchTerm}%`,
                    });
                }
                users = yield querySelecter.getMany().then((u) => u.map((x) => {
                    delete x.password;
                    return x;
                }));
            }
            catch (error) {
                console.log(error);
            }
            return users;
        });
    }
    create(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let userUpdated = null;
            const userRepo = typeorm_1.getRepository(user_schema_1.UserSchema);
            const userRoleRepo = typeorm_1.getRepository(users_roles_schema_1.UserRole);
            if (user.id) {
                const userCreated = yield userRepo.create(user);
                userUpdated = yield userRepo.save(userCreated);
                if (userUpdated) {
                    const roles = [];
                    (_a = user.roles) === null || _a === void 0 ? void 0 : _a.forEach((role) => __awaiter(this, void 0, void 0, function* () {
                        const userRole = new users_roles_schema_1.UserRole(+role.id, userUpdated.id);
                        const userRoleCreated = yield userRoleRepo.create(userRole);
                        roles.push(userRoleCreated);
                    }));
                    yield userRoleRepo.save(roles);
                }
            }
            else {
                user.password = const_variable_1.PASSWORD_DEFAULT;
                const userCreated = yield userRepo.create(user);
                userUpdated = yield userRepo.save(userCreated);
            }
            return userUpdated;
        });
    }
}
exports.UserService = UserService;
