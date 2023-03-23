import { plainToClass, plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { FindManyOptions, Repository, Between, ILike } from 'typeorm';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';
import { Project } from '../../infrastructure/schemas/project.schema';

@Injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly repository: Repository<Project>
    ) {}

    async create(projectE: ProjectEntity): Promise<ProjectEntity> {
        const project = plainToClass(Project, projectE);
        const result = await this.repository.create(project);
        await this.repository.save(result);
        return plainToClass(ProjectEntity, result);
    }

    async findById(id: number): Promise<ProjectEntity> {
        const project = await this.repository.findOneOrFail(id);
        return plainToClass(ProjectEntity, project);
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findAll(query: any): Promise<ProjectEntity[]> {
        let findOption: FindManyOptions = {
            relations: ['users', 'users.workloads', 'users.roles'],
            order: {
                created_at: 'DESC',
            },
            where: {
                name: ILike(`%${query.project_name || ''}%`),
                start_date: Between(new Date(query.start_date), new Date(query.end_date)),
            },
        };

        const projects = await this.repository.find(findOption as FindManyOptions).then((p) => plainToInstance(ProjectEntity, p));
        return projects;
    }
}
