import { ILogger } from '../../domain/logger/logger.interface';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class DeleteProjectUseCases {
    constructor(private readonly logger: ILogger, private readonly projectRepository: IProjectRepository) {}

    async execute(id: number): Promise<void> {
        await this.projectRepository.deleteById(id);
        this.logger.log('deleteTodoUseCases execute', `Todo ${id} have been deleted`);
    }
}
