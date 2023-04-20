import { UserEntity } from './user.entity';

export class ProjectEntity {
    id: number;
    name: string;
    note: string;
    project_leader: number;
    users: UserEntity[] = [];
}
