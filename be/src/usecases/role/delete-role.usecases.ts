import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';

export class deleteTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(id: number): Promise<void> {
        await this.roleRepository.deleteById(id);
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
