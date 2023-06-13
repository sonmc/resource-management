import { PermSchema } from '../../service/schemas/perm.schema';
import { get_routes, post_routes, delete_routes } from '../../route';
import { createConnection } from 'typeorm';

async function seed() {
    try {
        const connection = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'test_db1',
            entities: ['dist/service/schemas/**/*.js'],
        });
        const routers = [...get_routes, ...post_routes, ...delete_routes];
        const permRepo = connection.getRepository(PermSchema);
        const permissions: any = [];
        const permList = await permRepo.find();
        if (permList.length < routers.length) {
            routers.forEach((route: any) => {
                const module = route.path.indexOf('auth') > -1 ? '' : route.path;
                const path = route.path.replace('/api/', '');
                const action = route.ctrl.name;
                const perm = {
                    title: action + ' ' + module.replace('/', ''),
                    module: path.replace('/', ''),
                    action: action,
                    profile_types: route.name,
                };
                const permCreated = permRepo.create(perm);
                permissions.push(permCreated);
            });
            await permRepo.save(permissions);
        }
        await connection.close();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
}

seed();
