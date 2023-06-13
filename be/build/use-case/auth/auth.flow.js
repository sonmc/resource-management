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
    constructor(_authService, _userService) {
        this.authService = _authService;
        this.userService = _userService;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, result } = yield this.userService.getUser(username);
            if (status === 'error' || !result) {
                return { status, result: {} };
            }
            const user = result;
            const isMatched = yield bcrypt_util_1.compare(password, user.password);
            if (!isMatched) {
                return { status, result: {} };
            }
            const payload = { id: user.id, username: user.username };
            const accessToken = yield bcrypt_util_1.generateAccessToken(payload);
            const refreshToken = yield bcrypt_util_1.generateRefreshToken(payload);
            yield this.authService.updateLoginTime(user.username);
            yield this.authService.setRefreshToken(refreshToken, username);
            return { status: 'success', result: { accessToken, refreshToken } };
        });
    }
    refreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, result } = yield this.userService.getUser(refresh_token);
            if (status === 'error') {
                return { status, result: null };
            }
            const userSchema = result;
            const isRefreshTokenMatching = yield bcrypt_util_1.compare(refresh_token, userSchema.hash_refresh_token);
            if (isRefreshTokenMatching) {
                return { status, result: null };
            }
            const payload = { username: result.username };
            const accessToken = yield bcrypt_util_1.generateAccessToken(payload);
            return { status, result: accessToken };
        });
    }
}
exports.AuthFlow = AuthFlow;
exports.default = AuthFlow;
