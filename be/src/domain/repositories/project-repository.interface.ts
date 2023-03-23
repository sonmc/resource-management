import { ProjectFilterPresenter } from 'src/presentation/controllers/project/presenter/project-filter.presenter';
import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository {
    create(project: ProjectEntity): Promise<ProjectEntity>;
    findAll(query: any): Promise<ProjectEntity[]>;
    findById(id: number): Promise<ProjectEntity>;
    deleteById(id: number): Promise<void>;
}
