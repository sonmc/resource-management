import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM } from '../../domain/model/user';
import { IUserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../../infrastructure/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userEntityRepository: Repository<User>
    ) {}
    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.userEntityRepository.update(
            {
                username: username,
            },
            { hach_refresh_token: refreshToken }
        );
    }
    async getUserByUsername(username: string): Promise<UserM> {
        const adminUserEntity = await this.userEntityRepository.findOne({
            where: {
                username: username,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return this.toUser(adminUserEntity);
    }
    async updateLastLogin(username: string): Promise<void> {
        await this.userEntityRepository.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }

    private toUser(adminUserEntity: User): UserM {
        const adminUser: UserM = new UserM();

        adminUser.id = adminUserEntity.id;
        adminUser.username = adminUserEntity.username;
        adminUser.password = adminUserEntity.password;
        adminUser.createDate = adminUserEntity.created_at;
        adminUser.updatedDate = adminUserEntity.updated_at;
        adminUser.lastLogin = adminUserEntity.last_login;
        adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

        return adminUser;
    }

    private toUserEntity(adminUser: UserM): User {
        const adminUserEntity: User = new User();

        adminUserEntity.username = adminUser.username;
        adminUserEntity.password = adminUser.password;
        adminUserEntity.last_login = adminUser.lastLogin;

        return adminUserEntity;
    }
}