import { plainToClass } from 'class-transformer';
import { ADMIN_ID, PASSWORD_DEFAULT, STATUS_INACTIVE } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from 'src/infrastructure/schemas/user.schema';
import { UserRole } from 'src/infrastructure/schemas/user-role.schema';
import { Project } from 'src/infrastructure/schemas/project.schema';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) {}

    async deleteById(id: number): Promise<void> {
        const userSchema = await this.userRepository.findOne(id);
        userSchema.status = STATUS_INACTIVE;
        const userCreated = await this.userRepository.create(userSchema);
        await this.userRepository.save(userCreated);
    }

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

    async findAll(query: any): Promise<UserEntity[]> {
        const querySelecter = this.userRepository.createQueryBuilder('u');
        querySelecter.leftJoinAndSelect('u.roles', 'r').where('u.id != :id', { id: ADMIN_ID });
        let users = null;
        try {
            const role_id = parseInt(query.roleId);
            if (role_id) {
                querySelecter.andWhere('r.id = :id', { id: role_id });
            }
            if (query.status_level > 0) {
                querySelecter.andWhere('u.status_level = :status_level', { status: query.status_level });
            }
            if (query.status > 0) {
                querySelecter.andWhere('u.status = :status', { status: query.status });
            }
            if (query.searchTerm) {
                querySelecter.andWhere('u.username like :name', { name: `%${query.searchTerm}%` });
            }
            users = await querySelecter.getMany().then((u) =>
                u.map((x) => {
                    delete x.password;
                    return plainToClass(UserEntity, x);
                })
            );
        } catch (error) {
            console.log(error);
        }
        return users;
    }

    async createOrUpdate(user: UserEntity): Promise<UserEntity> {
        const userSchema = plainToClass(User, user);
        let userUpdated = new User();
        if (user.id != 0) {
            const userCreated = await this.userRepository.create(userSchema);
            userUpdated = await this.userRepository.save(userCreated);
            if (userUpdated) {
                user.roles.forEach(async (role) => {
                    const userRole = new UserRole(+role.id, userUpdated.id);
                    const userRoleCreated = await this.userRoleRepository.create(userRole);
                    await this.userRoleRepository.save(userRoleCreated);
                });
            }
        } else {
            const userCreated = await this.userRepository.create(userSchema);
            userUpdated = await this.userRepository.save(userCreated);
        }

        const userE = plainToClass(UserEntity, userUpdated);
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

    async getProjects(user_id: number): Promise<string[]> {
        let projects = [];
        if (user_id !== ADMIN_ID) {
            projects = await this.projectRepository
                .createQueryBuilder('projects')
                .select('projects.name', 'name')
                .innerJoin('users_projects', 'up', 'up.project_id=projects.id')
                .innerJoin('users', 'u', 'u.id=up.user_id')
                .where('u.id= :user_id', { user_id: user_id })
                .printSql()
                .getRawMany();
        }
        const projectNameList = projects.map((p) => p.name);
        return projectNameList;
    }
}
