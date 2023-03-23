import { plainToClass } from 'class-transformer';
import { generateWorkload } from 'src/actions/workload.action';
import { IUserProjectRepository } from 'src/domain/repositories/user-roject.repository.interface';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { IWorkloadRepository } from 'src/domain/repositories/workload-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserProjectEntity } from 'src/domain/entities/user-project.entity';
import { AddMemberEntity } from 'src/domain/entities/add-member.entity';
import { UserWithoutPassword } from 'src/domain/entities/user.entity';

export class AddMemberUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly userProjectRepository: IUserProjectRepository, private readonly workloadRepository: IWorkloadRepository) {}

    async execute(data: AddMemberEntity): Promise<UserWithoutPassword[]> {
        let listUserAdded = [];
        await Promise.all(
            data.members.map(async (user) => {
                const userProject = plainToClass(UserProjectEntity, {
                    id: 0,
                    project_id: data.project_id,
                    user_id: user.id,
                    start_date: data.start_date,
                    end_date: data.end_date,
                });
                await this.userProjectRepository.create(userProject);
                const workloads = generateWorkload(data.start_date, data.end_date, user.id, data.workload + '', data.project_id);
                Promise.all(
                    workloads.map(async (wl) => {
                        wl.user = await this.userRepository.findOne(wl.user_id);
                        await this.workloadRepository.create(wl);
                    })
                );
                const userSchema = await this.userRepository.findOne(user.id);
                userSchema.workloads = workloads;
                this.logger.log('AddMemberUseCases execute', 'New member have been added');
                listUserAdded.push(userSchema);
            })
        );
        return listUserAdded;
    }
}
