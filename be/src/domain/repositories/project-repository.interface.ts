import { ProjectEntity } from '../entities/project.entity';

export interface IProjectRepository {
  create(project: ProjectEntity): Promise<ProjectEntity>;
  findAll(limit: number, cursor: number): Promise<ProjectEntity[]>;
  findById(id: number): Promise<ProjectEntity>;
  update(id: number, ProjectEntity: ProjectEntity): Promise<void>;
  deleteById(id: number): Promise<void>;
}
