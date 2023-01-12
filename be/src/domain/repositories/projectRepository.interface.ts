import { ProjectModel } from '../model/project';

export interface IProjectRepository {
    insert(project: ProjectModel): Promise<ProjectModel>;
    findAll(): Promise<ProjectModel[]>;
    findById(id: number): Promise<ProjectModel>;
    update(id: number, projectModel: ProjectModel): Promise<void>;
    deleteById(id: number): Promise<void>;
}
