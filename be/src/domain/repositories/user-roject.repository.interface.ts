import { UserProjectEntity } from '../entities/user-project.entity';

export interface IUserProjectRepository {
    findAll(): Promise<UserProjectEntity[]>;
    create(user: UserProjectEntity): Promise<UserProjectEntity>;
}
