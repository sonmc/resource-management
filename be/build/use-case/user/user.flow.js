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
exports.UserFlow = void 0;
const bcrypt_util_1 = require("../../util/bcrypt.util");
class UserFlow {
    constructor(_userService) {
        this.userService = _userService;
    }
    getCurrentUser(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = bcrypt_util_1.getUserNameByToken(access_token);
            const { status, result } = yield this.userService.getUser(username);
            return { status, result };
        });
    }
    getAllUser(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.list(param);
        });
    }
}
exports.UserFlow = UserFlow;
exports.default = UserFlow;
