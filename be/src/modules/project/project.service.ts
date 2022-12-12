import { UserService } from 'src/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Workload } from '../workload/entities/workload.entity';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>, private readonly userService: UserService) { }

    async create(createProjectDto: CreateProjectDto) {
        return await 'This action adds a new project';
    }

    async findAll() {
        let projects = null;
        try {
            projects = await this.projectRepository.find({
                relations: ["users", "users.role", "users.workloads"],

            });
            projects.forEach((project) => {
                project.users.forEach((user) => {
                    if (user.workloads.length == 0) {
                        for (let index = 0; index < 12; index++) {
                            let workload = new Workload();
                            workload.id = 0;
                            workload.startDate = new Date;
                            workload.value = "";
                            workload.user = user;
                            user.workloads.push(workload);
                        }
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
        return projects;
    }


    async findOne(id: number) {
        return await this.projectRepository.findOne(id);
    }

    remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
