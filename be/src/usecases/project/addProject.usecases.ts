import { ILogger } from '../../domain/logger/logger.interface';
import { ProjectModel } from '../../domain/model/project';
import { ProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class addTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly projectRepository: ProjectRepository) {}

    async execute(content: string): Promise<ProjectModel> {
        const project = new ProjectModel();
        project.content = content;
        project.isDone = false;
        const result = await this.projectRepository.insert(project);
        this.logger.log('addProjectUseCases execute', 'New project have been inserted');
        return result;
    }
}
