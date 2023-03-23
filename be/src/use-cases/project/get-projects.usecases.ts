import { generateWorkload } from 'src/actions/workload.action';
import { UserEntity } from 'src/domain/entities/user.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ProjectFilterPresenter } from 'src/presentation/controllers/project/presenter/project-filter.presenter';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class GetProjectsUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(filter: ProjectFilterPresenter): Promise<ProjectEntity[]> {
        const datas = await this.projectRepository.findAll(filter);
        datas.forEach((project) => {
            if (project.users.length > 0) {
                project.users.forEach((user) => {
                    if (user.workloads.length == 0) {
                        user.workloads = generateWorkload(null, null, user.id, '', project.id);
                    }
                });
            } else {
                const user = new UserEntity(new User());
                user.workloads = generateWorkload(null, null, 0, '', project.id);
                project.users.push(user);
            }
        });
        return datas;
    }
}
