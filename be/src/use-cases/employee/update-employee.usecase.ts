import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { EmployeePresenter } from 'src/presentation/controllers/employee/presenter/employee.presenter';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/domain/entities/user.entity';

export class UpdateEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(userP: EmployeePresenter): Promise<EmployeePresenter> {
        const userE = plainToClass(UserEntity, userP);
        const user = await this.userRepository.createOrUpdate(userE);
        this.logger.log('updateEmployeeUseCases execute', 'employee have been updated');
        const userPresenter = plainToClass(EmployeePresenter, user);
        return userPresenter;
    }
}
