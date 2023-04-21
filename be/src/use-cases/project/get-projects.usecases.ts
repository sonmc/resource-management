import { generateWorkloadEmpty } from 'src/actions/workload.action';
import { UserEntity } from 'src/domain/entities/user.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class GetProjectsUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(query: any): Promise<ProjectEntity[]> {
        const res = await this.projectRepository.findAll(query);
        res.forEach((project) => {
            if (project.users.length > 0) {
                project.users.forEach((user) => {
                    user.full_name = (user.first_name || '') + ' ' + (user.last_name || '');
                    if (user.workloads.length == 0) {
                        user.workloads = generateWorkloadEmpty(user.workloads, query.wl_start_date, query.weekInCurrentMonth, user.id, project.id);
                    } else if (user.workloads.length < query.weekInCurrentMonth) {
                        const workloadsEmpty = generateWorkloadEmpty(user.workloads, query.wl_start_date, query.weekInCurrentMonth - user.workloads.length, user.id, project.id);
                        const workloads = user.workloads.length > 0 ? [...user.workloads, ...workloadsEmpty] : user.workloads;
                        user.workloads = workloads.sort((objA, objB) => Number(objA.start_date) - Number(objB.start_date));
                    }
                });
            } else {
                const user = new UserEntity(new User());
                user.full_name = '';
                user.workloads = generateWorkloadEmpty([], query.wl_start_date, query.weekInCurrentMonth, 0, project.id);
                project.users.push(user);
            }
        });
        return res;
    }
}
