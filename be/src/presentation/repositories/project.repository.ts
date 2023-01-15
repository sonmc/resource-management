import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { Repository } from 'typeorm';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';
import { Project } from '../../infrastructure/schemas/project.schema';

@Injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly repository: Repository<Project>
    ) {}

    async update(id: number, projectEntity: ProjectEntity): Promise<void> {
        // await this.repository.update({
        //   id: id,
        // });
    }

    async create(projectE: ProjectEntity): Promise<ProjectEntity> {
        const project = this.toProjectSchema(projectE);
        const result = await this.repository.insert(project);
        return this.toTodo(result.generatedMaps[0] as Project);
    }

    async findAll(): Promise<ProjectEntity[]> {
        const projects = await this.repository
            .find({
                relations: ['users', 'users.role', 'users.workloads'],
            })
            .then((p) => p.map((x) => new ProjectEntity(x)));
        return projects;
    }

    async findById(id: number): Promise<ProjectEntity> {
        const todoEntity = await this.repository.findOneOrFail(id);
        return this.toTodo(todoEntity);
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id: id });
    }

    private toTodo(todoEntity: Project): ProjectEntity {
        const project: ProjectEntity = new ProjectEntity();

        project.id = todoEntity.id;

        return project;
    }

    private toProjectSchema(todo: ProjectEntity): Project {
        const project: Project = new Project();
        project.id = todo.id;
        return project;
    }
}
