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
exports.syncAllRouter = void 0;
const perm_schema_1 = require("@service/schemas/perm.schema");
function syncAllRouter(router, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const routers = [];
        router.stack.forEach((middleware) => {
            if (middleware) {
                if (middleware.methods && middleware.methods.length > 0) {
                    const routeHandler = middleware.stack[0];
                    routers.push({
                        module: middleware.path.replace('/api/', ''),
                        action: routeHandler.name,
                        profileType: middleware.name,
                    });
                }
            }
        });
        const permRepo = connection.getRepository(perm_schema_1.PermSchema);
        const permissions = [];
        const permList = yield permRepo.find();
        if (permList.length < routers.length) {
            routers.forEach((route) => {
                const perm = {
                    title: route.action + ' ' + (route.module.indexOf('auth') > -1 ? '' : route.module),
                    module: route.module,
                    action: route.action,
                    profile_types: route.profileType,
                };
                const permCreated = permRepo.create(perm);
                permissions.push(permCreated);
            });
            yield permRepo.save(permissions);
        }
    });
}
exports.syncAllRouter = syncAllRouter;
