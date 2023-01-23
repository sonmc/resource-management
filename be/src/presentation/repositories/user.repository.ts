import { plainToClass } from 'class-transformer';
import { PASSWORD_DEFAULT } from './../../business-rules/employee.rule';
import { ADMIN_ID } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UserEntity, UserWithoutPassword } from '../../domain/entities/user.entity';
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
    const userE = plainToClass(UserEntity, user);
    return userE;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    let users = await this.userRepository
      .find({
        where: { id: MoreThan(ADMIN_ID) },
        relations: ['role'],
      })
      .then((u) => u.map((x) => plainToClass(UserWithoutPassword, x)));
    return users;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userSchema = plainToClass(User, user);
    await userSchema.setPassword(PASSWORD_DEFAULT);
    userSchema.role = await this.roleRepository.findOne(user.role_id);
    const result = await this.userRepository.create(userSchema);
    await this.userRepository.save(result);
    const userE = plainToClass(UserEntity, result);
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
