export function syncAllRouter(router: any, connection: any) {
    const routers: any[] = [];
    router.stack.forEach((middleware: any) => {
        if (middleware) {
            if (middleware.methods && middleware.methods.length > 0) {
                const routeHandler = middleware.stack[0];
                routers.push({
                    endpoint: middleware.path,
                    funtion_name: routeHandler.name,
                });
            }
        }
    });

    routers.forEach((path) => {
        console.log(path);
    });

    // const permRepo = connection.getRepository(Permission);
}
