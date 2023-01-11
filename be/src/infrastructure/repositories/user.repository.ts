import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../domain/model/user.model';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../schemas/user.schema';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userEntityRepository: Repository<User>
    ) {}
    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.userEntityRepository.update(
            {
                name: username,
            },
            { hach_refresh_token: refreshToken }
        );
    }
    async getUserByUsername(username: string): Promise<UserModel> {
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
                name: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }

    private toUser(adminUserEntity: User): UserModel {
        const adminUser: UserModel = new UserModel();

        adminUser.id = adminUserEntity.id;
        adminUser.username = adminUserEntity.name;
        adminUser.password = adminUserEntity.password;
        adminUser.createDate = adminUserEntity.created_at;
        adminUser.updatedDate = adminUserEntity.updated_at;
        adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

        return adminUser;
    }

    private toUserEntity(adminUser: UserModel): User {
        const adminUserEntity: User = new User();

        adminUserEntity.name = adminUser.username;
        adminUserEntity.password = adminUser.password;

        return adminUserEntity;
    }
}
