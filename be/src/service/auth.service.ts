import { getRepository } from 'typeorm';
import { hash } from 'util/bcrypt.util';
import { User } from '../../database/schemas/user.schema';

export interface IAuth {
    updateLoginTime(username: string): any;
    setRefreshToken(refreshToken: string, username: string): any;
}

export class AuthService implements IAuth {
    async updateLoginTime(username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            where: {
                username: username,
            },
        })) as User;
        user.last_login = new Date();
        await userRepo.save(user);
        return { status: 'success', result: user };
    }

    async setRefreshToken(refreshToken: string, username: string) {
        const userRepo = getRepository(User);
        const user = (await userRepo.findOne({
            where: {
                username: username,
            },
        })) as User;
        const currentHashedRefreshToken = await hash(refreshToken);
        user.hash_refresh_token = currentHashedRefreshToken;
        userRepo.save(user);
        return { status: 'success', result: user };
    }
}
