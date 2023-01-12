import { ILogger } from '../../domain/logger/logger.interface';
import { ProjectModel } from '../../domain/model/project';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class AddProjectUseCases {
    constructor(private readonly logger: ILogger, private readonly projectRepository: IProjectRepository) {}

    async execute(content: string): Promise<ProjectModel> {
        const project = new ProjectModel();
        project.content = content;
        project.isDone = false;
        const result = await this.projectRepository.insert(project);
        this.logger.log('addProjectUseCases execute', 'New project have been inserted');
        return result;
    }
}
