import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class CreateEmployeesUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.insert(user);
    }
}
