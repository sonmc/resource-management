import { createConnection } from 'typeorm';
import { PermSchema } from '../../service/schemas/perm.schema';
import { RolePermSchema } from '../../service/schemas/roles-perms.schema';
import { RoleSchema } from '../../service/schemas/role.schema';
import { UserSchema } from '../../service/schemas/user.schema';
import { WorkspaceSchema } from '../../service/schemas/workspace.schema';
import { hash } from '../../util/bcrypt.util';
const superAdmin = '[1]';
const admin = '[2]';
const admin_department = '[3]';
const staff = '[10]';

const publicApi = '[]';
async function seed() {
    try {
        console.log('seeding...');
        const connection = await createConnection({
            type: 'mysql',
            host: '61.14.233.220',
            port: 3306,
            username: 'admin',
            password: '123123123',
            database: 'baongoc_db',
            entities: ['dist/service/schemas/**/*.js'],
        });
        await createGroup(connection);
        await createPerm(connection);
        await createWorkspace(connection);
        await createUser(connection);
        console.log('all data inserted');
        await connection.close();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
}

async function createPerm(connection: any) {
    const permRepo = connection.getRepository(PermSchema);
    const rolePermRepo = connection.getRepository(RolePermSchema);
    const perms = await permRepo.find();
    const rolesPerms: any = [];
    perms.forEach((perm: any) => {
        if (perm.profile_types == superAdmin) {
            const rolePerm = {
                role_id: 1,
                perm_id: perm.id,
            };
            const rolePermCreated = rolePermRepo.create(rolePerm);
            rolesPerms.push(rolePermCreated);
        } else if (perm.profile_types == admin) {
            const rolePerm = {
                role_id: 2,
                perm_id: perm.id,
            };
            const rolePermCreated = rolePermRepo.create(rolePerm);
            rolesPerms.push(rolePermCreated);
        } else if (perm.profile_types == '[1,2]' || perm.profile_types == '[1,2,3]' || perm.profile_types == publicApi) {
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

            const rolePerm3 = {
                role_id: 3,
                perm_id: perm.id,
            };
            const rolePermCreated3 = rolePermRepo.create(rolePerm3);
            rolesPerms.push(rolePermCreated3);
        } else if (perm.profile_types == '[3]') {
            const rolePerm = {
                role_id: 3,
                perm_id: perm.id,
            };
            const rolePermCreated = rolePermRepo.create(rolePerm);
            rolesPerms.push(rolePermCreated);
        }
    });
    await rolePermRepo.save(rolesPerms);
}
async function createGroup(connection: any) {
    const groups = [
        {
            id: 1,
            title: 'Super Admin',
            profile_type: 1,
            description: '',
        },
        {
            id: 2,
            title: 'Admin',
            profile_type: 2,
            description: '',
        },
        {
            id: 3,
            title: 'Staff',
            profile_type: 3,
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

async function createWorkspace(connection: any) {
    const workspace = {
        id: 1,
        title: 'admin workspace',
        is_super: true,
        des: '',
    };
    const workspaceRepo = connection.getRepository(WorkspaceSchema);
    const workspaceCreated = await workspaceRepo.create(workspace);
    await workspaceRepo.save(workspaceCreated);
}

async function createUser(connection: any) {
    const workspaceRepo = connection.getRepository(WorkspaceSchema);
    const workspace = await workspaceRepo.findOne(1);
    const passDefault = await hash('123456');
    const user = {
        id: '1',
        username: 'admin',
        full_name: 'admin',
        is_owner: true,
        group_ids: '[1]',
        workspace: workspace,
        password: passDefault,
    };
    const userRepo = connection.getRepository(UserSchema);
    const userCreated = await userRepo.create(user);
    await userRepo.save(userCreated);
}

seed();
