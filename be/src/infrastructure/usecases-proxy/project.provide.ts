import { ProjectRepository } from 'src/presentation/repositories/project.repository';
import { UserProjectRepository } from 'src/presentation/repositories/user-project.repository';
import { UserRepository } from 'src/presentation/repositories/user.repository';
import { WorkloadRepository } from 'src/presentation/repositories/workload.repository';
import { AddMemberUseCases } from 'src/usecases/project/add-member.usercase';
import { CreateProjectUseCases } from 'src/usecases/project/add-project.usecases';
import { GetProjectsUseCases } from 'src/usecases/project/get-projects.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';

export function getProjectProvide(provide) {
    return {
        inject: [ProjectRepository],
        provide,
        useFactory: (ProjectRepository: ProjectRepository) => new UseCaseProxy(new GetProjectsUseCases(ProjectRepository)),
    };
}
export function createProjectProvide(provide) {
    return {
        inject: [LoggerService, ProjectRepository],
        provide,
        useFactory: (logger: LoggerService, ProjectRepository: ProjectRepository) => new UseCaseProxy(new CreateProjectUseCases(logger, ProjectRepository)),
    };
}
export function addMemberProvide(provide) {
    return {
        inject: [LoggerService, UserRepository, UserProjectRepository, WorkloadRepository],
        provide,
        useFactory: (logger: LoggerService, userRepository: UserRepository, userProjectRepository: UserProjectRepository, workloadRepository: WorkloadRepository) => new UseCaseProxy(new AddMemberUseCases(logger, userRepository, userProjectRepository, workloadRepository)),
    };
}
