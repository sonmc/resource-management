import { plainToClass } from 'class-transformer';
import { ADMIN_ID, PASSWORD_DEFAULT } from '../../business-rules/employee.rule';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Equal, Repository } from 'typeorm';
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
    const user = await this.userRepository.findOne(id);
    const userE = plainToClass(UserEntity, user);
    return userE;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    let users = await this.userRepository
      .find({
        where: { id: Not(Equal(ADMIN_ID)) },
        relations: ['roles'],
      })
      .then((u) => u.map((x) => plainToClass(UserWithoutPassword, x)));
    return users;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userSchema = plainToClass(User, user);
    userSchema.password = await hash(PASSWORD_DEFAULT);
    const userCreated = await this.userRepository.create(userSchema);
    await this.userRepository.save(userCreated);
    user.roles.forEach(async (role) => {
      const userRole = new UserRole(+role.id, role.id);
      const userRoleCreated = await this.userRoleRepository.create(userRole);
      await this.userRoleRepository.save(userRoleCreated);
    });
    const userE = plainToClass(UserEntity, userCreated);
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
