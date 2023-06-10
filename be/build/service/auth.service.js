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
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_util_1 = require("util/bcrypt.util");
const user_schema_1 = require("service/schemas/user.schema");
class AuthService {
    updateLoginTime(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(user_schema_1.UserSchema);
            const user = (yield userRepo.findOne({
                where: {
                    username: username,
                },
            }));
            user.last_login = new Date();
            yield userRepo.save(user);
            return { status: 'success', result: user };
        });
    }
    setRefreshToken(refreshToken, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(user_schema_1.UserSchema);
            const user = (yield userRepo.findOne({
                where: {
                    username: username,
                },
            }));
            const currentHashedRefreshToken = yield (0, bcrypt_util_1.hash)(refreshToken);
            user.hash_refresh_token = currentHashedRefreshToken;
            userRepo.save(user);
            return { status: 'success', result: user };
        });
    }
}
exports.AuthService = AuthService;
