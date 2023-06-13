import { PermSchema } from 'service/schemas/perm.schema';

export async function syncAllRouter(router: any, connection: any) {
    const routers: any[] = [];
    router.stack.forEach((middleware: any) => {
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
    const permRepo = connection.getRepository(PermSchema);
    const permissions: any = [];
    const permList = await permRepo.find();
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
        await permRepo.save(permissions);
    }
}
