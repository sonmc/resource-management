import { getRepository } from 'typeorm';
import { User } from '../../database/schemas/user.schema';

export interface IUser {
    list(): any;
    getUser(username: string): any;
}
export class UserService implements IUser {
    async getUser(username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            relations: ['roles', 'roles.permissions'],
            where: { username: username },
        })) as User;
        if (user) {
            return { status: 'success', result: user };
        } else {
            return { status: 'error', result: new User() };
        }
    }

    async list() {
        const userRepo = getRepository(User);
        const users = await userRepo.find();
        return { status: 'success', result: users };
    }
}
