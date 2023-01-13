import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';
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
        const userProject = new UserProjectEntity();
        userProject.project_id = member.project_id;
        userProject.user_id = member.user_id;
        await this.userProjectRepository.create(userProject);

        const workloads = generateWorkload(member.user_id, member.workload + '', member.start_Date, member.project_id);
        workloads.forEach((wl) => {
            this.workloadRepository.create(wl);
        });
        this.workloadRepository.save(workloads);
        const user = await this.userRepository.findOne(member.user_id);
        user.workloads = workloads;
        this.logger.log('AddMemberUseCases execute', 'New member have been added');
        return user;
    }
}
