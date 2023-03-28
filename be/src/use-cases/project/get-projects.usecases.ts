import { generateWorkload } from 'src/actions/workload.action';
import { UserEntity } from 'src/domain/entities/user.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ProjectFilterPresenter } from 'src/presentation/controllers/project/presenter/project-filter.presenter';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class GetProjectsUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(query: any): Promise<ProjectEntity[]> {
        const res = await this.projectRepository.findAll(query);
        res.forEach((project) => {
            if (project.users.length > 0) {
                project.users.forEach((user) => {
                    if (user.workloads.length == 0) {
                        user.workloads = generateWorkload(query.weekInCurrentMonth, null, null, user.id, '', project.id);
                    }
                });
            } else {
                const user = new UserEntity(new User());
                user.workloads = generateWorkload(query.weekInCurrentMonth, null, null, 0, '', project.id);
                project.users.push(user);
            }
        });
        return res;
    }
}
