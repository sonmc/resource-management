import { DynamicModule, Module } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { RepositoriesModule } from '../../application/repositories/zrepository.module';

import { getLoginProvide, isAuthenticatedProvide, logoutProvide } from './auth.provide';
import { addMemberProvide, createProjectProvide, getProjectProvide } from './project.provider';
import { getRoleProvide, createRoleProvide, deleteRoleProvide } from './role.provider';
import { getEmployeeProvide, getEmployeesProvide, createEmployeeProvide } from './employee.provider';

@Module({
    imports: [LoggerModule, JwtModule, BcryptModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    // Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
    static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
    static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
    // Project
    static GET_PROJECT_USECASES_PROXY = 'GetProjectUsecasesProxy';
    static GET_PROJECTS_USECASES_PROXY = 'GetProjectsUsecasesProxy';
    static CREATE_PROJECT_USECASES_PROXY = 'GostProjectUsecasesProxy';
    static ADD_MEMBER_USECASES_PROXY = 'AddMemberUsecasesProxy';
    // Role
    static GET_ROLES_USECASES_PROXY = 'GetRolesUsecasesProxy';
    static CREATE_ROLE_USECASES_PROXY = 'CreateRoleUsecasesProxy';
    static PUT_ROLE_USECASES_PROXY = 'PutRoleUsecasesProxy';
    static DELETE_ROLE_USECASES_PROXY = 'DeleteRoleUsecasesProxy';
    // Employee
    static GET_EMPLOYEES_USECASES_PROXY = 'GetEmployeesUsecasesProxy';
    static GET_EMPLOYEE_USECASES_PROXY = 'GetEmployeeUsecasesProxy';
    static CREATE_EMPLOYEES_USECASES_PROXY = 'CreateEmployeesUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                getLoginProvide(UsecasesProxyModule.LOGIN_USECASES_PROXY),
                isAuthenticatedProvide(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY),
                logoutProvide(UsecasesProxyModule.LOGOUT_USECASES_PROXY),
                // Projects
                getProjectProvide(UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY),
                createProjectProvide(UsecasesProxyModule.CREATE_PROJECT_USECASES_PROXY),
                addMemberProvide(UsecasesProxyModule.ADD_MEMBER_USECASES_PROXY),
                // Roles
                getRoleProvide(UsecasesProxyModule.GET_ROLES_USECASES_PROXY),
                createRoleProvide(UsecasesProxyModule.CREATE_ROLE_USECASES_PROXY),
                deleteRoleProvide(UsecasesProxyModule.DELETE_ROLE_USECASES_PROXY),
                // Employees
                getEmployeeProvide(UsecasesProxyModule.GET_EMPLOYEES_USECASES_PROXY),
                getEmployeesProvide(UsecasesProxyModule.GET_EMPLOYEE_USECASES_PROXY),
                createEmployeeProvide(UsecasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY),
            ],
            exports: [
                // Auths
                UsecasesProxyModule.LOGIN_USECASES_PROXY,
                UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                UsecasesProxyModule.LOGOUT_USECASES_PROXY,
                // Projects
                UsecasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                UsecasesProxyModule.CREATE_PROJECT_USECASES_PROXY,
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
