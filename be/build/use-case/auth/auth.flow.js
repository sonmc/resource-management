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
exports.AuthFlow = void 0;
const bcrypt_util_1 = require("util/bcrypt.util");
class AuthFlow {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, result } = yield this.userService.getUser(username);
            if (status === 'error') {
                return { status: 'error', result: {} };
            }
            const user = result;
            const isMatched = yield (0, bcrypt_util_1.compare)(password, user.password);
            if (!isMatched) {
                return { status: 'error', result: {} };
            }
            const accessToken = yield (0, bcrypt_util_1.generateAccessToken)(user.id);
            const refreshToken = yield (0, bcrypt_util_1.generateRefreshToken)(user.id);
            yield this.authService.setRefreshToken(refreshToken, username);
            yield this.authService.updateLoginTime(username);
            return { status: 'success', result: { accessToken, refreshToken } };
        });
    }
    refreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = (0, bcrypt_util_1.getUserNameByToken)(refresh_token);
            const payload = { username: username };
            const accessToken = yield (0, bcrypt_util_1.generateAccessToken)(payload);
            return { status: 'success', result: { accessToken } };
        });
    }
}
exports.AuthFlow = AuthFlow;
