import { plainToClass, plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { FindManyOptions, Repository, Between, ILike } from 'typeorm';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';
import { Project } from '../../infrastructure/schemas/project.schema';
import { User } from 'src/infrastructure/schemas/user.schema';
import { Role } from 'src/infrastructure/schemas/role.schema';

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
        const data = await this.repository
            .createQueryBuilder('project')
            .where('project.name LIKE :name', { name: `%${query.project_name}%` })
            .orderBy('project.created_at', 'DESC')
            .andWhere('project.start_date >= :startDate', { startDate: query.start_date })
            .andWhere('project.start_date <= :endDate', { endDate: query.end_date })
            .leftJoinAndSelect('project.users', 'user')
            .leftJoinAndSelect('user.roles', 'role')
            .leftJoinAndSelect('user.workloads', 'workload', 'workload.project_id = project.id')
            .getMany();
        let projects = await data.map((p) => plainToInstance(ProjectEntity, p));
        return projects;
    }
}
