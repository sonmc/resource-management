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
                    user.full_name = user.first_name + '' + user.last_name;
                    if (user.workloads.length == 0) {
                        user.workloads = generateWorkload(query.weekInCurrentMonth, null, null, user.id, '', project.id);
                    } else if (user.workloads.length < query.weekInCurrentMonth) {
                        const workloads = generateWorkload(query.weekInCurrentMonth - user.workloads.length, null, null, user.id, '', project.id);
                        user.workloads = [...user.workloads, ...workloads];
                    }
                });
            } else {
                const user = new UserEntity(new User());
                user.full_name = '';
                user.workloads = generateWorkload(query.weekInCurrentMonth, null, null, 0, '', project.id);
                project.users.push(user);
            }
        });
        return res;
    }
}
