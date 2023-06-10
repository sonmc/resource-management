"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    constructor(user) {
        this.username = '';
        this.full_name = '';
        this.email = '';
        this.username = user.username;
        this.email = user.email;
        this.roles = user.roles;
        this.full_name = user.full_name;
    }
}
exports.UserPresenter = UserPresenter;
