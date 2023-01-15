import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class CreateEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(userE: UserEntity): Promise<UserEntity> {
        const user = await this.userRepository.create(userE);
        this.logger.log('createEmployeeUseCases execute', 'New employee have been inserted');
        return user;
    }
}
