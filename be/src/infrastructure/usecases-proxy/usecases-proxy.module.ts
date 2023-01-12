import { DynamicModule, Module } from '@nestjs/common';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../../application/repositories/repositories.module';

import { ProjectRepository } from '../../application/repositories/project.repository';
import { UserRepository } from '../../application/repositories/user.repository';

import { UseCaseProxy } from './usecases-proxy';
import { GetProjectsUseCases } from 'src/usecases/project/getProjects.usecases';
import { AddProjectUseCases } from 'src/usecases/project/addProject.usecases';
import { UpdateProjectUseCases } from 'src/usecases/project/updateProject.usecases';
import { GetProjectUseCases } from 'src/usecases/project/getProject.usecases';

@Module({
    imports: [LoggerModule, JwtModule, BcryptModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    // Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
    static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
    static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

    static GET_PROJECT_USECASES_PROXY = 'getProjectUsecasesProxy';
    static GET_PROJECTS_USECASES_PROXY = 'getProjectsUsecasesProxy';
    static POST_PROJECT_USECASES_PROXY = 'postProjectUsecasesProxy';
    static PUT_PROJECT_USECASES_PROXY = 'putProjectUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [LoggerService, JwtTokenService, UserRepository, BcryptService],
                    provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
                    useFactory: (logger: LoggerService, jwtTokenService: JwtTokenService, userRepo: UserRepository, bcryptService: BcryptService) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, userRepo, bcryptService)),
                },
                {
                    inject: [UserRepository],
                    provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                    useFactory: (userRepo: UserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
                },
                {
                    inject: [],
                    provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
                    useFactory: () => new UseCaseProxy(new LogoutUseCases()),
                },
                {
                    inject: [ProjectRepository],
                    provide: UsecasesProxyModule.GET_PROJECT_USECASES_PROXY,
                    useFactory: (projectRepository: ProjectRepository) => new UseCaseProxy(new GetProjectUseCases(projectRepository)),
                },
                {
                    inject: [ProjectRepository],
                    provide: UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                    useFactory: (projectRepository: ProjectRepository) => new UseCaseProxy(new GetProjectsUseCases(projectRepository)),
                },
                {
                    inject: [LoggerService, ProjectRepository],
                    provide: UsecasesProxyModule.POST_PROJECT_USECASES_PROXY,
                    useFactory: (logger: LoggerService, projectRepository: ProjectRepository) => new UseCaseProxy(new AddProjectUseCases(logger, projectRepository)),
                },
                {
                    inject: [LoggerService, ProjectRepository],
                    provide: UsecasesProxyModule.PUT_PROJECT_USECASES_PROXY,
                    useFactory: (logger: LoggerService, projectRepository: ProjectRepository) => new UseCaseProxy(new UpdateProjectUseCases(logger, projectRepository)),
                },
            ],
            exports: [
                // Projects
                UsecasesProxyModule.GET_PROJECT_USECASES_PROXY,
                UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                UsecasesProxyModule.POST_PROJECT_USECASES_PROXY,
                UsecasesProxyModule.PUT_PROJECT_USECASES_PROXY,
                // Auths
                UsecasesProxyModule.LOGIN_USECASES_PROXY,
                UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                UsecasesProxyModule.LOGOUT_USECASES_PROXY,
                // Roles

                // Employees
            ],
        };
    }
}
