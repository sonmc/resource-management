import { createConnection } from 'typeorm';
import { PermSchema } from '../../service/schemas/perm.schema';
import { RolePermSchema } from '../../service/schemas/roles-perm.schema';
import { RoleSchema } from '../../service/schemas/role.schema';
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
        await createGroup(connection);
        const permRepo = connection.getRepository(PermSchema);
        const rolePermRepo = connection.getRepository(RolePermSchema);
        const perms = await permRepo.find();
        const rolesPerms: any = [];
        perms.forEach((perm) => {
            if (perm.profile_types == '[1]') {
                const rolePerm = {
                    role_id: 1,
                    perm_id: perm.id,
                };
                const rolePermCreated = rolePermRepo.create(rolePerm);
                rolesPerms.push(rolePermCreated);
            } else if (perm.profile_types == '[2]') {
                const rolePerm = {
                    role_id: 2,
                    perm_id: perm.id,
                };
                const rolePermCreated = rolePermRepo.create(rolePerm);
                rolesPerms.push(rolePermCreated);
            } else if (perm.profile_types == '[1,2]' || perm.profile_types == '[]') {
                const rolePerm = {
                    role_id: 1,
                    perm_id: perm.id,
                };
                const rolePermCreated = rolePermRepo.create(rolePerm);
                rolesPerms.push(rolePermCreated);
                const rolePerm2 = {
                    role_id: 2,
                    perm_id: perm.id,
                };
                const rolePermCreated2 = rolePermRepo.create(rolePerm2);
                rolesPerms.push(rolePermCreated2);
            }
        });
        await rolePermRepo.save(rolesPerms);
        await connection.close();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
}
async function createGroup(connection: any) {
    const groups = [
        {
            id: 1,
            title: 'Admin',
            profile_type: 1,
            description: '',
        },
        {
            id: 2,
            title: 'Staff',
            profile_type: 1,
            description: '',
        },
    ];
    const groupRepo = connection.getRepository(RoleSchema);
    const groupList: any = [];
    groups.forEach((g) => {
        const groupCreated = groupRepo.create(g);
        groupList.push(groupCreated);
    });
    await groupRepo.save(groupList);
}
seed();
