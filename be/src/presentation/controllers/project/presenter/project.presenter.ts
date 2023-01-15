import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

export class ProjectPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    note: string;
    @ApiProperty()
    users: UserEntity[];

    constructor(project: ProjectEntity) {
        this.id = project.id;
        this.name = project.name;
        this.note = project.note;
        this.users = project.users;
    }
}
