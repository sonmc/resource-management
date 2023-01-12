import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectModel } from 'src/domain/model/project';
import { Repository } from 'typeorm';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';
import { Project } from '../../infrastructure/schemas/project.schema';

@Injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly repository: Repository<Project>
    ) {}

    async update(id: number, projectModel: ProjectModel): Promise<void> {
        // await this.projectRepository.update({
        //   id: id,
        // });
    }
    async insert(todo: ProjectModel): Promise<ProjectModel> {
        const todoEntity = this.toTodoEntity(todo);
        const result = await this.repository.insert(todoEntity);
        return this.toTodo(result.generatedMaps[0] as Project);
    }
    async findAll(): Promise<ProjectModel[]> {
        const todosEntity = await this.repository.find();
        return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
    }
    async findById(id: number): Promise<ProjectModel> {
        const todoEntity = await this.repository.findOneOrFail(id);
        return this.toTodo(todoEntity);
    }
    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id: id });
    }

    private toTodo(todoEntity: Project): ProjectModel {
        const todo: ProjectModel = new ProjectModel();

        todo.id = todoEntity.id;
        todo.createdDate = todoEntity.created_at;
        todo.updatedDate = todoEntity.updated_at;

        return todo;
    }

    private toTodoEntity(todo: ProjectModel): Project {
        const todoEntity: Project = new Project();

        todoEntity.id = todo.id;

        return todoEntity;
    }
}
