import { ApiProperty } from '@nestjs/swagger';
import { ProjectModel } from 'src/domain/model/project';

export class ProjectPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    content: string;
    @ApiProperty()
    isDone: boolean;
    @ApiProperty()
    createdate: Date;
    @ApiProperty()
    updateddate: Date;

    constructor(project: ProjectModel) {
        this.id = project.id;
        this.content = project.content;
        this.isDone = project.isDone;
        this.createdate = project.createdDate;
        this.updateddate = project.updatedDate;
    }
}