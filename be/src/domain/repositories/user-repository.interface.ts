import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
    getUserByUsername(username: string): Promise<UserEntity>;
    updateLastLogin(username: string): Promise<void>;
    updateRefreshToken(username: string, refreshToken: string): Promise<void>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    insert(user: UserEntity): Promise<UserEntity>;
}
