import { ILogger } from '../../domain/logger/logger.interface';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class CreateProjectUseCases {
    constructor(private readonly logger: ILogger, private readonly projectRepository: IProjectRepository) {}

    async execute(project: ProjectEntity): Promise<ProjectEntity> {
        const result = await this.projectRepository.create(project);
        this.logger.log('addProjectUseCases execute', 'New project have been inserted');
        return result;
    }
}
