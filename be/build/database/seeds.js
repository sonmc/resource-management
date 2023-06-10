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
exports.seed = void 0;
const user_schema_1 = require("service/schemas/user.schema");
function seed(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_schema_1.UserSchema();
        user.email = 'test@test.com';
        user.full_name = 'Jan';
        yield connection.manager.save(user);
        console.log('Saved a new user with id: ' + user.id);
        console.log('Here you can setup and run express/koa/any other framework.');
    });
}
exports.seed = seed;
