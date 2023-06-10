"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const typeorm_1 = require("typeorm");
const base_schema_1 = require("./base.schema");
const role_schema_1 = require("./role.schema");
let UserSchema = exports.UserSchema = class UserSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.username = '';
        this.full_name = '';
        this.email = '';
        this.password = '';
        this.hash_refresh_token = '';
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserSchema.prototype, "last_login", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "hash_refresh_token", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_schema_1.RoleSchema, (role) => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    }),
    __metadata("design:type", Object)
], UserSchema.prototype, "roles", void 0);
exports.UserSchema = UserSchema = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], UserSchema);
