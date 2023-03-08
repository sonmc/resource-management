import { compare, hash } from 'src/infrastructure/services/bcrypt.service';
import { IJwtService, IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { STATUS_INACTIVE } from 'src/business-rules/employee.rule';

export class LoginUseCases {
    constructor(private readonly logger: ILogger, private readonly jwtTokenService: IJwtService, private readonly userRepository: IUserRepository) {}

    async getJwtToken(username: string) {
        const payload: IJwtServicePayload = { username: username };
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return token;
    }

    async getJwtRefreshToken(username: string) {
        const payload: IJwtServicePayload = { username: username };
        const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
        const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        await this.setCurrentRefreshToken(token, username);
        return token;
    }

    async validateUserForLocalStragtegy(username: string, pass: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user || user.status == STATUS_INACTIVE) {
            return null;
        }
        const isMatched = await compare(pass, user.password);
        if (user && isMatched) {
            await this.updateLoginTime(user.username);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserForJWTStragtegy(username: string) {
        return await this.userRepository.getUserByUsername(username);
    }

    async updateLoginTime(username: string) {
        await this.userRepository.updateLastLogin(username);
    }

    async setCurrentRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await hash(refreshToken);
        await this.userRepository.updateRefreshToken(username, currentHashedRefreshToken);
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const isRefreshTokenMatching = await compare(refreshToken, user.hash_refresh_token);
        if (isRefreshTokenMatching) {
            return user;
        }
        return null;
    }
}
