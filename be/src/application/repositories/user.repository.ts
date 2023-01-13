import { ADMIN_ID } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../infrastructure/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    findOne(id: number): Promise<UserEntity> {
        return this.repository.findOne(id);
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.repository.find({
            where: { id: LessThan(ADMIN_ID) },
        });
        return users.map((u) => new UserEntity(u));
    }

    async insert(user: UserEntity): Promise<UserEntity> {
        const result = await this.repository.insert(user);
        return new UserEntity(result.generatedMaps[0] as User);
    }

    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.repository.update(
            {
                username: username,
            },
            { hash_refresh_token: refreshToken }
        );
    }
    async getUserByUsername(username: string): Promise<UserEntity> {
        const adminUserEntity = await this.repository.findOne({
            where: {
                username: username,
            },
        });
        if (!adminUserEntity) {
            return null;
        }
        return new UserEntity(adminUserEntity);
    }
    async updateLastLogin(username: string): Promise<void> {
        await this.repository.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }
}
