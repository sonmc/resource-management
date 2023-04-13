import { UserEntity, UserWithoutPassword } from '../entities/user.entity';

export interface IUserRepository {
    getUserByUsername(username: string): Promise<UserEntity>;
    updateLastLogin(username: string): Promise<void>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
    findAll(query: any): Promise<UserWithoutPassword[]>;
    findOne(id: number): Promise<UserEntity>;
    createOrUpdate(user: UserWithoutPassword): Promise<UserWithoutPassword>;
    deleteById(id: number): Promise<void>;
}
