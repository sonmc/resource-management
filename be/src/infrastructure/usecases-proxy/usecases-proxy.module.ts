import { AddMemberUseCases } from 'src/usecases/project/add-member.usercase';
import { DynamicModule, Module, HttpStatus } from '@nestjs/common';

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
import { RepositoriesModule } from '../../application/repositories/zrepository.module';

import { ProjectRepository } from '../../application/repositories/project.repository';
import { UserRepository } from '../../application/repositories/user.repository';
import { RoleRepository } from '../../application/repositories/role.repository';

import { UseCaseProxy } from './usecases-proxy';
import { GetProjectsUseCases } from 'src/usecases/project/get-projects.usecases';
import { CreateProjectUseCases } from 'src/usecases/project/add-project.usecases';

import { GetRolesUseCases } from 'src/usecases/role/get-roles.usecases';
import { GetEmployeesUseCases } from 'src/usecases/employee/get-employees.usecases';
import { WorkloadRepository } from 'src/application/repositories/workload.repository';
import { UserProjectRepository } from 'src/application/repositories/user-project.repository';
import { GetEmployeeUseCases } from 'src/usecases/employee/get-employee.usecases';
import { CreateRoleUseCases } from 'src/usecases/role/create-role.usecases';
import { DeleteRoleUseCases } from 'src/usecases/role/delete-role.usecases';
import { CreateEmployeeUseCases } from 'src/usecases/employee/create-employee.usercase';

@Module({
    imports: [LoggerModule, JwtModule, BcryptModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    // Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
    static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
    static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
    // Project
    static GET_PROJECT_USECASES_PROXY = 'getProjectUsecasesProxy';
    static GET_PROJECTS_USECASES_PROXY = 'getProjectsUsecasesProxy';
    static POST_PROJECT_USECASES_PROXY = 'postProjectUsecasesProxy';
    static ADD_MEMBER_USECASES_PROXY = 'addMemberUsecasesProxy';
    // Role
    static GET_ROLES_USECASES_PROXY = 'getRolesUsecasesProxy';
    static CREATE_ROLE_USECASES_PROXY = 'createRoleUsecasesProxy';
    static PUT_ROLE_USECASES_PROXY = 'putRoleUsecasesProxy';
    static DELETE_ROLE_USECASES_PROXY = 'deleteRoleUsecasesProxy';
    // Employee
    static GET_EMPLOYEES_USECASES_PROXY = 'getEmployeesUsecasesProxy';
    static GET_EMPLOYEE_USECASES_PROXY = 'getEmployeeUsecasesProxy';
    static CREATE_EMPLOYEES_USECASES_PROXY = 'createEmployeesUsecasesProxy';

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
                // Projects
                {
                    inject: [ProjectRepository],
                    provide: UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                    useFactory: (ProjectRepository: ProjectRepository) => new UseCaseProxy(new GetProjectsUseCases(ProjectRepository)),
                },
                {
                    inject: [LoggerService, ProjectRepository],
                    provide: UsecasesProxyModule.POST_PROJECT_USECASES_PROXY,
                    useFactory: (logger: LoggerService, ProjectRepository: ProjectRepository) => new UseCaseProxy(new CreateProjectUseCases(logger, ProjectRepository)),
                },
                {
                    inject: [LoggerService, UserRepository, UserProjectRepository, WorkloadRepository],
                    provide: UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY,
                    useFactory: (logger: LoggerService, userRepository: UserRepository, userProjectRepository: UserProjectRepository, workloadRepository: WorkloadRepository) => new UseCaseProxy(new AddMemberUseCases(logger, userRepository, userProjectRepository, workloadRepository)),
                },
                // Roles
                {
                    inject: [LoggerService, RoleRepository],
                    provide: UsecasesProxyModule.GET_ROLES_USECASES_PROXY,
                    useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new GetRolesUseCases(logger, RoleRepository)),
                },
                {
                    inject: [LoggerService, RoleRepository],
                    provide: UsecasesProxyModule.CREATE_ROLE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new CreateRoleUseCases(logger, RoleRepository)),
                },
                {
                    inject: [LoggerService, RoleRepository],
                    provide: UsecasesProxyModule.DELETE_ROLE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new DeleteRoleUseCases(logger, RoleRepository)),
                },

                // Employees
                {
                    inject: [LoggerService, UserRepository],
                    provide: UsecasesProxyModule.GET_EMPLOYEES_USECASES_PROXY,
                    useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetEmployeesUseCases(logger, UserRepository)),
                },
                {
                    inject: [LoggerService, UserRepository],
                    provide: UsecasesProxyModule.GET_EMPLOYEE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new GetEmployeeUseCases(logger, UserRepository)),
                },
                {
                    inject: [LoggerService, UserRepository],
                    provide: UsecasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY,
                    useFactory: (logger: LoggerService, UserRepository: UserRepository) => new UseCaseProxy(new CreateEmployeeUseCases(logger, UserRepository)),
                },
            ],
            exports: [
                // Auths
                UsecasesProxyModule.LOGIN_USECASES_PROXY,
                UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                UsecasesProxyModule.LOGOUT_USECASES_PROXY,
                // Projects
                UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                UsecasesProxyModule.POST_PROJECT_USECASES_PROXY,
                UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY,
                // Roles
                UsecasesProxyModule.GET_ROLES_USECASES_PROXY,
                UsecasesProxyModule.CREATE_ROLE_USECASES_PROXY,
                UsecasesProxyModule.DELETE_ROLE_USECASES_PROXY,
                // Employees
                UsecasesProxyModule.GET_EMPLOYEES_USECASES_PROXY,
                UsecasesProxyModule.GET_EMPLOYEE_USECASES_PROXY,
                UsecasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY,
            ],
        };
    }
}
