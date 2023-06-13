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
exports.UserSchema = void 0;
const typeorm_1 = require("typeorm");
const base_schema_1 = require("./base.schema");
const role_schema_1 = require("./role.schema");
const vacation_schema_1 = require("./vacation.schema");
const new_schema_1 = require("./new.schema");
const bcrypt_util_1 = require("../../util//bcrypt.util");
let UserSchema = class UserSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.username = '';
        this.full_name = '';
        this.nick_name = '';
        this.email = '';
        this.phone_number = '';
        this.password = '';
        this.status = 0;
        this.gender = false;
        this.avatar = '';
        this.dob = new Date();
        this.address = '';
        this.introduce = '';
        this.hash_refresh_token = '';
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcrypt_util_1.hash(password || this.password);
        });
    }
};
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "full_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "nick_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSchema.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserSchema.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UserSchema.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UserSchema.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSchema.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "introduce", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], UserSchema.prototype, "last_login", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserSchema.prototype, "hash_refresh_token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UserSchema.prototype, "onboarding", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserSchema.prototype, "status_level", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserSchema.prototype, "chapterHead", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserSchema.prototype, "setPassword", null);
__decorate([
    typeorm_1.OneToMany(() => new_schema_1.NewSchema, (n) => n.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], UserSchema.prototype, "news", void 0);
__decorate([
    typeorm_1.OneToMany(() => vacation_schema_1.VacationSchema, (vacation) => vacation.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], UserSchema.prototype, "vacations", void 0);
__decorate([
    typeorm_1.ManyToMany(() => role_schema_1.RoleSchema, (role) => role.users),
    typeorm_1.JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    }),
    __metadata("design:type", Array)
], UserSchema.prototype, "roles", void 0);
UserSchema = __decorate([
    typeorm_1.Entity({ name: 'users' })
], UserSchema);
exports.UserSchema = UserSchema;
