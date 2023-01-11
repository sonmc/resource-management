import { ProjectModel } from '../../domain/model/project';
import { ProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class getTodosUseCases {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async execute(): Promise<ProjectModel[]> {
        return await this.projectRepository.findAll();
    }
}
