import { PermSchema } from '@service/schemas/perm.schema';

export async function syncAllRouter(router: any, connection: any) {
    const routers: any[] = [];
    router.stack.forEach((middleware: any) => {
        if (middleware) {
            if (middleware.methods && middleware.methods.length > 0) {
                const routeHandler = middleware.stack[0];
                routers.push({
                    endpoint: middleware.path.replace('/api/', ''),
                    function_name: routeHandler.name,
                });
            }
        }
    });

    const permRepo = connection.getRepository(PermSchema);
    const permissions: any = [];
    routers.forEach((path) => {
        const perm = {
            name: path.endpoint,
            label: path.function_name,
        };

        const permCreated = permRepo.create(perm);
        permissions.push(permCreated);
    });
    await permRepo.save(permissions);
}
