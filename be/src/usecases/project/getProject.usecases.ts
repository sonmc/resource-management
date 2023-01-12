import { ProjectModel } from '../../domain/model/project';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class GetProjectUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(id: number): Promise<ProjectModel> {
        return await this.projectRepository.findById(id);
    }
}
