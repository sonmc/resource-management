import { UserService } from 'src/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>, private readonly userService: UserService) {}

    async create(createProjectDto: CreateProjectDto) {
        return await 'This action adds a new project';
    }

    async findAll() {
        let projects = await Project.find({
            join: {
                alias: 'project',
                leftJoinAndSelect: {
                    users: 'project.users',
                },
            },
        });

        return projects;
    }

    async findOne(id: number) {
        return await this.projectRepository.findOne(id);
    }

    remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
