"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAllPerm = void 0;
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const router_util_1 = require("util/router.util");
const perm_service_1 = __importDefault(require("service/perm.service"));
const index_1 = __importDefault(require("index"));
function syncAllPerm() {
    const capturedRoutes = (0, express_list_endpoints_1.default)(index_1.default);
    const routers = (0, router_util_1.getAllRouter)(capturedRoutes);
    perm_service_1.default.updateFromRouter(routers);
}
exports.syncAllPerm = syncAllPerm;
syncAllPerm();
