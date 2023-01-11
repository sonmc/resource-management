import { ProjectModel } from '../../domain/model/project';
import { ProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class GetTodoUseCases {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async execute(id: number): Promise<ProjectModel> {
        return await this.projectRepository.findById(id);
    }
}
