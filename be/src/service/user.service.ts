import { getRepository } from 'typeorm';
import { UserSchema } from 'service/schemas/user.schema';

export interface IUser {
    list(): any;
    getUser(username: string): any;
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

    async list() {
        const userRepo = getRepository(UserSchema);
        const users = await userRepo.find();
        return { status: 'success', result: users };
    }
}
