"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PASSWORD_DEFAULT = '123456';
const seedQuery = fs_1.default.readFileSync('src/database/seed/user_seeding.sql', {
    encoding: 'utf8',
});
const connection = mysql2_1.default.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test_db1',
});
connection.connect();
const psw = PASSWORD_DEFAULT;
const hash = await bcrypt_1.default.hash(psw, 10);
connection.query(seedQuery, [hash], (err) => {
    if (err) {
        throw err;
    }
    connection.end();
});
