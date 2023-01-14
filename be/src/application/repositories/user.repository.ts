import { PASSWORD_DEFAULT } from './../../business-rules/employee.rule';
import { ADMIN_ID } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../infrastructure/schemas/user.schema';
import { Role } from 'src/infrastructure/schemas/role.schema';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);
        const userE = this.toUserEntity(user);
        return userE;
    }

    async findAll(): Promise<UserEntity[]> {
        let users = await this.userRepository
            .find({
                where: { id: MoreThan(ADMIN_ID) },
                relations: ['role'],
            })
            .then((u) => u.map((x) => this.toUserEntity(x)));
        return users;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const userSchema = this.toUserSchema(user);
        await userSchema.setPassword(PASSWORD_DEFAULT);
        userSchema.role = await this.roleRepository.findOne(user.role_id);
        const result = await this.userRepository.create(userSchema);
        await this.userRepository.save(result);
        const userE = this.toUserEntity(result);
        return userE;
    }

    async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.userRepository.update(
            {
                username: username,
            },
            { hash_refresh_token: refreshToken }
        );
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });
        if (!user) {
            return null;
        }
        return this.toUserEntity(user);
    }

    async updateLastLogin(username: string): Promise<void> {
        await this.userRepository.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }

    private toUserSchema(userE: UserEntity): User {
        const user: User = new User();
        user.id = userE.id;
        user.username = userE.username;
        user.password = userE.password;
        user.email = userE.email;
        user.phone_number = userE.phone_number;
        user.gender = userE.gender;
        user.status = userE.status;
        user.dob = userE.dob;
        return user;
    }

    private toUserEntity(user: User): UserEntity {
        const userE: UserEntity = new UserEntity();
        userE.id = user.id;
        userE.username = user.username;
        userE.email = user.email;
        userE.phone_number = user.phone_number;
        userE.gender = user.gender;
        userE.status = user.status;
        userE.dob = user.dob;
        userE.role = user.role;
        return userE;
    }
}
