"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNameByToken = exports.verify = exports.generateRefreshToken = exports.generateAccessToken = exports.compare = exports.hash = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hash(hashString) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(hashString, 10);
    });
}
exports.hash = hash;
function compare(password, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, hashPassword);
    });
}
exports.compare = compare;
function generateAccessToken(payload) {
    const secretKey = process.env.JWT_SECRET || '';
    const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiresIn });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(payload) {
    const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || '';
    const expiresInForRefreshToken = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's';
    return jsonwebtoken_1.default.sign(payload, secretKeyRefreshToken, { expiresIn: expiresInForRefreshToken });
}
exports.generateRefreshToken = generateRefreshToken;
function verify(token) {
    const secretKey = process.env.JWT_SECRET || '';
    return jsonwebtoken_1.default.verify(token, secretKey);
}
exports.verify = verify;
function getUserNameByToken(token) {
    const decoded = jsonwebtoken_1.default.decode(token);
    return decoded.username;
}
exports.getUserNameByToken = getUserNameByToken;
