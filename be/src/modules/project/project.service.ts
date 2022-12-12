import { AddMemberDto } from './dto/add-member.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Workload } from '../workload/entities/workload.entity';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(Project) private userRepository: Repository<User>) { }

    async create(createProjectDto: CreateProjectDto) {
        try {
            var project = await this.projectRepository.create(createProjectDto);
            await this.projectRepository.save(project);
            const user = new User();
            const users = []
            user.workloads = this.generateWorkload(0);
            users.push(user);
            project.setUsers(users);
        } catch (error) {
            console.log(error)
        }
        return project;
    }

    async addMember(addMember: AddMemberDto) {
        const project = await this.projectRepository.findOne(addMember.projectId);
        const user = await this.userRepository.findOne(addMember.userId);
    }

    async findAll() {
        let projects = null;
        try {
            projects = await this.projectRepository.find({
                relations: ["users", "users.role", "users.workloads"],

            });
            projects.forEach((project) => {
                if (project.users.length > 0) {
                    project.users.forEach((user) => {
                        if (user.workloads.length == 0) {
                            user.workloads = this.generateWorkload(user.id);
                        }
                    })
                } else {
                    const user = new User();
                    user.workloads = this.generateWorkload(0);
                    project.users.push(user);
                }

            })
        } catch (error) {
            console.log(error);
        }
        return projects;
    }

    async findOne(id: number) {
        return await this.projectRepository.findOne(id);
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        const role = await this.projectRepository.findOne(id);
        const roleTrans = Object.assign(role, updateProjectDto);
        return await this.projectRepository.save(roleTrans);
    }

    private generateWorkload(userId: number) {
        const workloads = [];
        for (let index = 0; index < 12; index++) {
            let workload = new Workload();
            workload.id = 0;
            workload.startDate = new Date;
            workload.value = "";
            workload.userId = userId;
            workloads.push(workload);
        }
        return workloads;
    }
}
