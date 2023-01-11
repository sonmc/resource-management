import { ProjectModel } from '../model/project';

export interface ProjectRepository {
    insert(project: ProjectModel): Promise<ProjectModel>;
    findAll(): Promise<ProjectModel[]>;
    findById(id: number): Promise<ProjectModel>;
    update(id: number, isDone: boolean): Promise<void>;
    deleteById(id: number): Promise<void>;
}
