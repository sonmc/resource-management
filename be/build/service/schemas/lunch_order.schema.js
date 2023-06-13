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
exports.LunchOrderSchema = void 0;
const typeorm_1 = require("typeorm");
const base_schema_1 = require("./base.schema");
const user_schema_1 = require("./user.schema");
let LunchOrderSchema = class LunchOrderSchema extends base_schema_1.BaseSchema {
    constructor() {
        super(...arguments);
        this.lunch_calendars = '';
    }
};
__decorate([
    typeorm_1.Column({
        type: 'json',
        nullable: true,
    }),
    __metadata("design:type", String)
], LunchOrderSchema.prototype, "lunch_calendars", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_schema_1.UserSchema),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_schema_1.UserSchema)
], LunchOrderSchema.prototype, "user", void 0);
LunchOrderSchema = __decorate([
    typeorm_1.Entity({ name: 'lunch_orders' })
], LunchOrderSchema);
exports.LunchOrderSchema = LunchOrderSchema;
