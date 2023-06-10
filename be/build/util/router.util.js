"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRouter = void 0;
function getAllRouter(capturedRoutes) {
    const routers = [];
    capturedRoutes.forEach((route) => {
        routers.push({
            path: route.path,
            method: route.methods.join(', '),
        });
    });
    return routers;
}
exports.getAllRouter = getAllRouter;
