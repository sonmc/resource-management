import { Any, getRepository } from 'typeorm';
import { UserSchema } from './schemas/user.schema';
import { ADMIN_ID, PASSWORD_DEFAULT, STATUS_INACTIVE, PROFILE_TYPE } from '../util/const.variable';
import { hash } from '../util/bcrypt.util';
import { UserRoleSchema } from './schemas/users-roles.schema';

export interface IUser {
    list(workspace_id: any, group_ids: string): Promise<any>;
    getUser(username: string): Promise<any>;
    delete(id: string): Promise<void>;
    update(user: UserSchema): Promise<any>;
    create(user: UserSchema): Promise<any>;
    findOne(id: number): Promise<any>;
}

export class UserService implements IUser {
    async findOne(id: number): Promise<any> {
        const userRepo = getRepository(UserSchema);
        return await userRepo.findOne(id);
    }
    async getUser(username: string) {
        const userRepo = getRepository(UserSchema);
        const user = (await userRepo.findOne({
            relations: ['roles', 'roles.permissions', 'workspace'],
            where: { username: username },
        })) as UserSchema;
        return user;
    }

    async delete(id: string): Promise<any> {
        return { status: 'success', result: id };
    }

    async list(param: any, group_ids: string): Promise<any> {
        const userRepo = getRepository(UserSchema);
        const querySelecter = userRepo.createQueryBuilder('u');
        if (param == 1 && group_ids == '[1]') {
            querySelecter.leftJoinAndSelect('u.workspace', 'w').where('u.id !=:id', { id: 1 });
        } else {
            querySelecter.leftJoinAndSelect('u.workspace', 'w').andWhere('w.id=:id', { id: param }).andWhere('u.is_owner=:is_owner', { is_owner: false });
        }

        let users = null;
        try {
            users = await querySelecter.getMany().then((u: any) =>
                u.map((x: any) => {
                    delete x.password;
                    return x;
                })
            );
        } catch (error) {
            console.log(error);
        }
        return { status: 'success', result: users || [] };
    }

    async create(user: UserSchema): Promise<any> {
        let userUpdated: any = null;
        const userRepo = getRepository(UserSchema);
        const userRoleRepo = getRepository(UserRoleSchema);
        if (user.id) {
            if (user.password) {
                user.password = await hash(user.password);
            }
            // const userCreated = await userRepo.create(user);
            userUpdated = await userRepo.update(user.id,user);
            if (userUpdated) {
                const roles: any = [];
                user.roles?.forEach(async (role) => {
                    const userRole = new UserRoleSchema(+role.id, userUpdated.id);
                    const userRoleCreated = await userRoleRepo.create(userRole);
                    roles.push(userRoleCreated);
                });
                await userRoleRepo.save(roles);
            }
        } else {
            user.password = PASSWORD_DEFAULT;
            user.group_ids = JSON.stringify([PROFILE_TYPE.STAFF]);
            const userCreated = await userRepo.create(user);
            userUpdated = await userRepo.save(userCreated);
        }
        return { status: 'success', result: userUpdated };
    }

    async update(user: UserSchema): Promise<any> {
        let userUpdated: any = null;
        const userRepo = getRepository(UserSchema);
        const userCreated = await userRepo.create(user);
        userUpdated = await userRepo.save(userCreated);
        return { status: 'success', result: userUpdated };
    }
}
