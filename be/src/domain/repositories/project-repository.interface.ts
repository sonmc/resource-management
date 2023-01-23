import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository {
  create(project: ProjectEntity): Promise<ProjectEntity>;
  findAll(): Promise<ProjectEntity[]>;
  findById(id: number): Promise<ProjectEntity>;
  update(id: number, ProjectEntity: ProjectEntity): Promise<void>;
}
