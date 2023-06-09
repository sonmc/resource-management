export function getAllRouter(capturedRoutes: any) {
    const routers: { path: any; method: any }[] = [];
    capturedRoutes.forEach((route: any) => {
        routers.push({
            path: route.path,
            method: route.methods.join(', '),
        });
    });
    return routers;
}
