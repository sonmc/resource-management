import { IUserProjectRepository } from 'src/domain/repositories/user-roject.repository.interface';
import { IWorkloadRepository } from 'src/domain/repositories/workload-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserEntity } from 'src/domain/entities/user.entity';

export class RemoveMemberUseCases {
    constructor(private readonly logger: ILogger, private readonly userProjectRepository: IUserProjectRepository, private readonly workloadRepository: IWorkloadRepository) {}

    async execute(project_id, user_id): Promise<UserEntity> {
        let userRemoved = null;
        const workloads = await this.workloadRepository.findByProjectIdUserId(project_id, user_id);
        if (workloads.length == 0) {
            userRemoved = await this.userProjectRepository.remove(project_id, user_id);
        }
        return userRemoved;
    }
}
