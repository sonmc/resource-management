import { Project } from 'src/infrastructure/schemas/project.schema';
import { UserEntity } from './user.entity';

export class ProjectEntity {
    id: number;
    name: string;
    note: string;
    users: UserEntity[] = [];
}
