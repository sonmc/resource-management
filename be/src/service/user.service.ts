import { getRepository } from 'typeorm';
import { UserSchema } from 'service/schemas/user.schema';
import { ADMIN_ID, PASSWORD_DEFAULT, STATUS_INACTIVE } from 'util/const.variable';
import { UserRole } from './schemas/users-roles.schema';

export interface IUser {
    list(param: any): Promise<any>;
    getUser(username: string): Promise<any>;
    deleteById(id: number): Promise<void>;
    create(user: UserSchema): Promise<UserSchema>;
}

export class UserService implements IUser {
    async getUser(username: string) {
        const userRepo = getRepository(UserSchema);
        const user = (await userRepo.findOne({
            relations: ['roles', 'roles.permissions'],
            where: { username: username },
        })) as UserSchema;

        if (user) {
            return { status: 'success', result: user };
        } else {
            return { status: 'error', result: new UserSchema() };
        }
    }

    async deleteById(id: number): Promise<void> {
        const userRepo = getRepository(UserSchema);
        const user = (await userRepo.findOne(id)) as UserSchema;
        user.status = STATUS_INACTIVE;
        const userCreated = await userRepo.create(user);
        await userRepo.save(userCreated);
    }

    async list(param: any): Promise<any> {
        const userRepo = getRepository(UserSchema);
        const querySelecter = userRepo.createQueryBuilder('u');
        querySelecter.leftJoinAndSelect('u.roles', 'r').where('u.id != :id', { id: ADMIN_ID });
        let users = null;
        try {
            const role_id = parseInt(param.roleId);
            if (role_id) {
                querySelecter.andWhere('r.id = :id', { id: role_id });
            }
            if (param.status_level > 0) {
                querySelecter.andWhere('u.status_level = :status_level', {
                    status: param.status_level,
                });
            }
            if (param.status > 0) {
                querySelecter.andWhere('u.status = :status', { status: param.status });
            }
            if (param.searchTerm) {
                querySelecter.andWhere('u.username like :name', {
                    name: `%${param.searchTerm}%`,
                });
            }
            users = await querySelecter.getMany().then((u: any) =>
                u.map((x: any) => {
                    delete x.password;
                    return x;
                })
            );
        } catch (error) {
            console.log(error);
        }
        return users;
    }

    async create(user: UserSchema): Promise<UserSchema> {
        let userUpdated: any = null;
        const userRepo = getRepository(UserSchema);
        const userRoleRepo = getRepository(UserRole);
        if (user.id) {
            const userCreated = await userRepo.create(user);
            userUpdated = await userRepo.save(userCreated);
            if (userUpdated) {
                const roles: any = [];
                user.roles?.forEach(async (role) => {
                    const userRole = new UserRole(+role.id, userUpdated.id);
                    const userRoleCreated = await userRoleRepo.create(userRole);
                    roles.push(userRoleCreated);
                });
                await userRoleRepo.save(roles);
            }
        } else {
            user.password = PASSWORD_DEFAULT;
            const userCreated = await userRepo.create(user);
            userUpdated = await userRepo.save(userCreated);
        }

        return userUpdated;
    }
}
