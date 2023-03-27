import { plainToClass } from 'class-transformer';
import { ADMIN_ID, PASSWORD_DEFAULT } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Equal, Repository, FindOneOptions } from 'typeorm';
import { UserEntity, UserWithoutPassword } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from 'src/infrastructure/schemas/user.schema';
import { hash } from 'src/infrastructure/services/bcrypt.service';
import { UserRole } from 'src/infrastructure/schemas/user-role.schema';
@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) {}

    async findOne(id: number): Promise<UserEntity> {
        let findOption: FindOneOptions = {
            relations: ['roles', 'workloads'],
            where: {
                id: id,
            },
        };
        const user = await this.userRepository.findOne(findOption);
        const userE = plainToClass(UserEntity, user);
        return userE;
    }

    async findAll(query: any): Promise<UserWithoutPassword[]> {
        const querySelecter = this.userRepository.createQueryBuilder('user');
        querySelecter.leftJoinAndSelect('user.roles', 'roles').where('user.id != :id', { id: ADMIN_ID });
        let users = null;
        try {
            // const role_id = parseInt(query.roleId);
            // if (role_id) {
            //     querySelecter.andWhere('user.roles = :id', { id: role_id });
            // }
            if (query.status > 0) {
                querySelecter.andWhere('user.status = :status', { status: query.status });
            }
            if (query.searchTerm) {
                querySelecter.andWhere('user.username like :name', { name: `%${query.searchTerm}%` });
            }
            users = await querySelecter.getMany().then((u) => u.map((x) => plainToClass(UserWithoutPassword, x)));
        } catch (error) {
            console.log(error);
        }
        return users;
    }

    async createOrUpdate(user: UserEntity): Promise<UserWithoutPassword> {
        const userSchema = plainToClass(User, user);
        let userUpdated = new User();
        if (user.id != 0) {
            userSchema.password = await hash(PASSWORD_DEFAULT);
            const userCreated = await this.userRepository.create(userSchema);
            userUpdated = await this.userRepository.save(userCreated);
            if (userUpdated) {
                user.roles.forEach(async (role) => {
                    const userRole = new UserRole(+role.id, role.id);
                    const userRoleCreated = await this.userRoleRepository.create(userRole);
                    await this.userRoleRepository.save(userRoleCreated);
                });
            }
        } else {
            const userCreated = await this.userRepository.create(userSchema);
            userUpdated = await this.userRepository.save(userCreated);
        }

        const userE = plainToClass(UserWithoutPassword, userUpdated);
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
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) {
            return null;
        }
        return plainToClass(UserEntity, user);
    }

    async updateLastLogin(username: string): Promise<void> {
        await this.userRepository.update(
            {
                username: username,
            },
            { last_login: () => 'CURRENT_TIMESTAMP' }
        );
    }
}
