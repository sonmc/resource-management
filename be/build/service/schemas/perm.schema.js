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
let PermSchema = class PermSchema {
    constructor() {
        this.id = 0;
        this.profile_types = '[]';
        this.title = '';
        this.module = '';
        this.action = '';
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PermSchema.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermSchema.prototype, "profile_types", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermSchema.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermSchema.prototype, "module", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PermSchema.prototype, "action", void 0);
__decorate([
    typeorm_1.ManyToMany(() => role_schema_1.RoleSchema, (role) => role.permissions),
    typeorm_1.JoinTable({
        name: 'roles_perms',
        joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    }),
    __metadata("design:type", Object)
], PermSchema.prototype, "roles", void 0);
PermSchema = __decorate([
    typeorm_1.Entity({ name: 'permissions' })
], PermSchema);
exports.PermSchema = PermSchema;
