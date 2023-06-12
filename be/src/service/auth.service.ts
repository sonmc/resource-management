import { UserSchema } from 'service/schemas/user.schema';
import { getRepository } from 'typeorm';
import { hash } from 'utils/bcrypt.util';

export class AuthService {
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
}
