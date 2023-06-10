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
exports.PermSchema = void 0;
const typeorm_1 = require("typeorm");
const role_schema_1 = require("./role.schema");
const base_schema_1 = require("./base.schema");
let PermSchema = exports.PermSchema = class PermSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.name = '';
        this.label = '';
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermSchema.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermSchema.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_schema_1.RoleSchema, (role) => role.permissions),
    (0, typeorm_1.JoinTable)({
        name: 'roles_perms',
        joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    }),
    __metadata("design:type", Object)
], PermSchema.prototype, "roles", void 0);
exports.PermSchema = PermSchema = __decorate([
    (0, typeorm_1.Entity)({ name: 'permissions' })
], PermSchema);
