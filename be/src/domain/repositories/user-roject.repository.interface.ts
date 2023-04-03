import { UserProject } from 'src/infrastructure/schemas/user_project.schema';
import { UserProjectEntity } from '../entities/user-project.entity';

export interface IUserProjectRepository {
    create(user: UserProjectEntity): Promise<UserProjectEntity>;
    remove(project_id, user_id): Promise<UserProject>;
}
