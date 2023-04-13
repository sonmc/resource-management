import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class DeleteEmployeeUseCases {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository) {}

    async execute(id: number): Promise<number> {
        await this.userRepository.deleteById(id);
        this.logger.log('deleteUserUseCases execute', `User ${id} have been deleted`);
        return id;
    }
}
