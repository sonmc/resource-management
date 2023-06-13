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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const route_1 = require("route");
const typeorm_1 = require("typeorm");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const sync_all_router_1 = require("database/sync_all_router");
const app = new koa_1.default();
const router = new router_1.default({
    prefix: '/api',
});
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(koa_bodyparser_1.default());
    app.use(router.routes()).use(router.allowedMethods());
    route_1.get_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.get(name, path, ctrl));
    route_1.post_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.post(name, path, ctrl));
    route_1.delete_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.delete(name, path, ctrl));
    app.listen(process.env.SERVER_PORT, () => {
        console.log('Server started on port ' + process.env.SERVER_PORT);
        sync_all_router_1.syncAllRouter(router, connection);
    });
}))
    .catch((error) => console.log('TypeORM connection error:', error));
