import { plainToClass } from 'class-transformer';
import { generateWorkload } from 'src/actions/workload.action';
import { IUserProjectRepository } from 'src/domain/repositories/user-roject.repository.interface';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { IWorkloadRepository } from 'src/domain/repositories/workload-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserProjectEntity } from 'src/domain/entities/user-project.entity';
import { AddMemberEntity } from 'src/domain/entities/add-member.entity';
import { UserEntity } from 'src/domain/entities/user.entity';

export class AddMemberUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly userProjectRepository: IUserProjectRepository, private readonly workloadRepository: IWorkloadRepository) {}

    async execute(member: AddMemberEntity): Promise<UserEntity> {
        const userProject = plainToClass(UserProjectEntity, member);
        await this.userProjectRepository.create(userProject);

        const workloads = generateWorkload(member.user_id, member.workload + '', member.project_id);
        workloads.forEach((wl) => {
            this.workloadRepository.create(wl);
        });
        const user = await this.userRepository.findOne(member.user_id);
        user.workloads = workloads;
        this.logger.log('AddMemberUseCases execute', 'New member have been added');
        return user;
    }
}
