import { PagingDataDto } from './../dto/paging.dto';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository {
    create(project: ProjectEntity): Promise<ProjectEntity>;
    findAll(query: any): Promise<PagingDataDto>;
    findById(id: number): Promise<ProjectEntity>;
    deleteById(id: number): Promise<void>;
}
