import { UserEntity, UserWithoutPassword } from '../entities/user.entity';

export interface IUserRepository {
  getUserByUsername(username: string): Promise<UserEntity>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  findAll(): Promise<UserWithoutPassword[]>;
  findOne(id: number): Promise<UserWithoutPassword>;
  create(user: UserWithoutPassword): Promise<UserWithoutPassword>;
}
