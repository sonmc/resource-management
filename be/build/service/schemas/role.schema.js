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
exports.RoleSchema = void 0;
const typeorm_1 = require("typeorm");
const perm_schema_1 = require("./perm.schema");
const user_schema_1 = require("./user.schema");
const base_schema_1 = require("./base.schema");
let RoleSchema = exports.RoleSchema = class RoleSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.name = '';
        this.description = '';
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleSchema.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RoleSchema.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_schema_1.UserSchema, (users) => users.roles),
    (0, typeorm_1.JoinTable)({
        name: 'users_roles',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    }),
    __metadata("design:type", Object)
], RoleSchema.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => perm_schema_1.PermSchema, (perm) => perm.roles, {
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'roles_perms',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'perm_id' },
    }),
    __metadata("design:type", Object)
], RoleSchema.prototype, "permissions", void 0);
exports.RoleSchema = RoleSchema = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles' })
], RoleSchema);
