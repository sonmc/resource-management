import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { EmployeePresenter } from 'src/presentation/controllers/employee/presenter/employee.presenter';
import { plainToClass } from 'class-transformer';

export class ChangeAvatarUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(id: number, avatar: string): Promise<EmployeePresenter> {
        const userSchema = await this.userRepository.findOne(id);
        userSchema.avatar = avatar;
        const user = await this.userRepository.createOrUpdate(userSchema);
        this.logger.log('updateEmployeeUseCases execute', 'employee have been updated');
        const userPresenter = plainToClass(EmployeePresenter, user);
        return userPresenter;
    }
}
