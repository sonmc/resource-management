import { generateWorkload } from 'src/actions/workload.action';
import { UserEntity } from 'src/domain/entities/user.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class GetProjectsUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(): Promise<ProjectEntity[]> {
        const projects = await this.projectRepository.findAll();
        projects.forEach((project) => {
            if (project.users.length > 0) {
                project.users.forEach((user) => {
                    if (user.workloads.length == 0) {
                        user.workloads = generateWorkload(user.id, '', new Date(), project.id);
                    }
                });
            } else {
                const user = new UserEntity(new User());
                user.workloads = generateWorkload(0, '', new Date(), project.id);
                project.users.push(user);
            }
        });
        return projects;
    }
}
