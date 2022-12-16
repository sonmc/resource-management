import { AddMemberDto } from './dto/add-member.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Workload } from '../workload/entities/workload.entity';
import { User } from '../user/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserProject } from '../user_project/entities/user_project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(UserProject) private userProjectRepository: Repository<UserProject>,
        @InjectRepository(Workload) private workloadRepository: Repository<Workload>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        try {
            var project = await this.projectRepository.create(createProjectDto);
            await this.projectRepository.save(project);
            const user = new User();
            const users = [];
            user.workloads = this.generateWorkload(0, '', new Date(), project.id);
            users.push(user);
            project.setUsers(users);
        } catch (error) {
            console.log(error);
        }
        return project;
    }

    async addMember(addMember: AddMemberDto) {
        const userProject = new UserProject();
        userProject.project_id = addMember.project_id;
        userProject.user_id = addMember.user_id;
        const up = await this.userProjectRepository.create(userProject);
        await this.userProjectRepository.save(up);

        const workloads = this.generateWorkload(addMember.user_id, addMember.workload + '', addMember.start_Date, addMember.project_id);
        workloads.forEach((wl) => {
            this.workloadRepository.create(wl);
        });
        this.workloadRepository.save(workloads);
        const user = await this.userRepository.findOne(addMember.user_id);
        user.workloads = workloads;
        return user;
    }

    async findAll() {
        try {
            var projects = await this.projectRepository.find({
                relations: ['users', 'users.role', 'users.workloads'],
            });
            projects.forEach((project) => {
                if (project.users.length > 0) {
                    project.users.forEach((user) => {
                        if (user.workloads.length == 0) {
                            user.workloads = this.generateWorkload(user.id, '', new Date(), project.id);
                        }
                    });
                } else {
                    const user = new User();
                    user.workloads = this.generateWorkload(0, '', new Date(), project.id);
                    project.users.push(user);
                }
            });
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

    private generateWorkload(user_id: number, value: string, start_Date: Date, projectId: number) {
        const workloads = [];
        for (let index = 0; index < 12; index++) {
            let workload = new Workload();
            workload.id = 0;
            workload.start_date = start_Date;
            workload.value = value;
            workload.user_id = user_id;
            workload.project_id = projectId;
            workloads.push(workload);
        }
        return workloads;
    }
}
