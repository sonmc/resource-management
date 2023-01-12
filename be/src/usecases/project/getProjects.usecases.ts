import { ProjectModel } from '../../domain/model/project';
import { IProjectRepository } from '../../domain/repositories/projectRepository.interface';

export class GetProjectsUseCases {
    constructor(private readonly projectRepository: IProjectRepository) {}

    async execute(): Promise<ProjectModel[]> {
        return await this.projectRepository.findAll();
    }
}
