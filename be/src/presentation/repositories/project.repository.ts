import { plainToClass, plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { FindManyOptions, Repository, MoreThan } from 'typeorm';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';
import { Project } from '../../infrastructure/schemas/project.schema';
import { PagingDataDto } from 'src/domain/dto/paging.dto';

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

    async findAll(filter, paging): Promise<PagingDataDto> {
        const realLimit = Math.min(20, paging.limit);
        let findOptionInitial: FindManyOptions = {
            relations: ['users', 'users.workloads'],
            order: {
                created_at: 'DESC',
            },
            // where: `(name like '%${filter.project_name}%' or start_date like '%${filter.start_date}%')`,
            take: realLimit,
        };
        let findOption: FindManyOptions;
        if (paging.cursor) {
            findOption = {
                ...findOptionInitial,
                where: {
                    id: MoreThan(paging.cursor),
                },
            };
        } else {
            findOption = findOptionInitial;
        }
        const projects = await this.repository.find().then((p) => plainToInstance(ProjectEntity, p));
        const datas = projects.slice(0, realLimit);
        const hasMore = projects.length === realLimit;
        const res = new PagingDataDto(datas, hasMore);
        return res;
    }
}
