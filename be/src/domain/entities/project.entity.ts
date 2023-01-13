import { Project } from 'src/infrastructure/schemas/project.schema';
import { UserEntity } from './user.entity';

export class ProjectEntity {
    id: number;
    name: string;
    note: string;
    users: UserEntity[];
    constructor(project?: Project) {
        this.id = project.id;
        this.name = project.name;
        this.note = project.note;
        this.users = project.users.map((u) => new UserEntity(u));
    }
}
