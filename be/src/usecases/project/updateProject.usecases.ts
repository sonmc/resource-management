import { ProjectModel } from 'src/domain/model/project';
import { ILogger } from '../../domain/logger/logger.interface';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class UpdateProjectUseCases {
    constructor(private readonly logger: ILogger, private readonly projectRepository: IProjectRepository) {}

    async execute(id: number, projectModel: ProjectModel): Promise<void> {
        await this.projectRepository.update(id, projectModel);
        this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
    }
}
