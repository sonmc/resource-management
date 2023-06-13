import { UserSchema } from './schemas/user.schema';
import { getRepository } from 'typeorm';
import { hash } from '../util/bcrypt.util';

export interface IAuth {
    updateLoginTime(username: string): any;
    setRefreshToken(refreshToken: string, username: string): any;
}
export class AuthService implements IAuth {
    async updateLoginTime(username: string) {
        const userRepo = getRepository(UserSchema);
        await userRepo.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }

    async setRefreshToken(refreshToken: string, username: string) {
        const hashedRefreshToken = await hash(refreshToken);
        const userRepo = getRepository(UserSchema);
        await userRepo.update(
            {
                username: username,
            },
            { hash_refresh_token: hashedRefreshToken }
        );
    }

    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        const userRepo = getRepository(UserSchema);
        await userRepo.update(
            {
                username: username,
            },
            { hash_refresh_token: refreshToken }
        );
    }
}
