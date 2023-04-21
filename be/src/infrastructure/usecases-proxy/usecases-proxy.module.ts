import { DynamicModule, Module } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';

import { JwtModule } from '../services/jwt/jwt.module';
import { RepositoriesModule } from 'src/presentation/repositories/zrepository.module';

import { getLoginProvide, isAuthenticatedProvide } from './auth.provide';
import { addMemberProvide, createProjectProvide, getProjectProvide, removeMemberProvide } from './project.provide';
import { getRoleProvide, createRoleProvide, deleteRoleProvide } from './role.provide';
import { getOneProvide, getAllProvide, createEmployeeProvide, deleteEmployeeProvide, updateEmployeeProvide } from './employee.provide';
import { addPermToRoleProvide, getPermissionsProvide } from './permission.provide';
import { getVacationsProvide, createVacationProvide, changeStatusProvide } from './vacation.provide';
import { createNewProvide, getNewsProvide } from './new.provide';
import { getLunchOrderProvide } from './lunch-order.provide';
import { createCandidateProvide, getCandidateProvide, getCandidatesProvide } from './candidate.provide';
import { createNotificationProvide, getNotificationsProvide } from './notification.provide';
@Module({
    imports: [LoggerModule, JwtModule, RepositoriesModule, ExceptionsModule],
})
export class UseCasesProxyModule {
    // Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
    static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
    // Project
    static GET_PROJECT_USECASES_PROXY = 'GetProjectUseCasesProxy';
    static GET_PROJECTS_USECASES_PROXY = 'GetProjectsUseCasesProxy';
    static CREATE_PROJECT_USECASES_PROXY = 'PostProjectUseCasesProxy';
    static ADD_MEMBER_USECASES_PROXY = 'AddMemberUseCasesProxy';
    static REMOVE_MEMBER_USECASES_PROXY = 'RemoveMemberUseCasesProxy';
    // Role
    static GET_ROLES_USECASES_PROXY = 'GetRolesUseCasesProxy';
    static CREATE_ROLE_USECASES_PROXY = 'CreateRoleUseCasesProxy';
    static PUT_ROLE_USECASES_PROXY = 'PutRoleUseCasesProxy';
    static DELETE_ROLE_USECASES_PROXY = 'DeleteRoleUseCasesProxy';
    // Employee
    static GET_EMPLOYEES_USECASES_PROXY = 'GetEmployeesUseCasesProxy';
    static GET_EMPLOYEE_USECASES_PROXY = 'GetEmployeeUseCasesProxy';
    static CREATE_EMPLOYEES_USECASES_PROXY = 'CreateEmployeesUseCasesProxy';
    static DELETE_EMPLOYEE_USECASES_PROXY = 'DeleteEmployeesUseCaseProxy';
    static UPDATE_EMPLOYEE_USECASES_PROXY = 'UpdateEmployeesUseCaseProxy';
    // Permission
    static GET_PERMISSIONS_USECASES_PROXY = 'GetPermissionsUseCasesProxy';
    static ADD_PERM_TO_ROLE_USECASES_PROXY = 'AddPermissionsUseCasesProxy';
    // Vacation
    static GET_VACATIONS_USECASES_PROXY = 'GetVacationsUseCasesProxy';
    static CREATE_VACATIONS_USECASES_PROXY = 'CreateVacationUseCaseProxy';
    static CHANGE_STATUS_USECASES_PROXY = 'ChangeStatusUseCaseProxy';
    // New
    static GET_NEWS_USECASES_PROXY = 'GetNewsUseCasesProxy';
    static CREATE_NEW_USECASES_PROXY = 'CreateNewsUseCaseProxy';
    // Lunch order
    static GET_LUNCH_ORDER_USECASES_PROXY = 'GetLunchUseCaseProxy';
    // Candidate
    static CREATE_CANDIDATE_USECASES_PROXY = 'CreateCandidateUseProxy';
    static GET_CANDIDATE_USECASES_PROXY = 'GetCandidateUseCaseProxy';
    static GET_CANDIDATES_USECASES_PROXY = 'GetCandidatesUseCaseProxy';
    // Notifications
    static GET_NOTIFICATION_USECASES_PROXY = 'GetNotificationUseCaseProxy';
    static CREATE_NOTIFICATION_USECASES_PROXY = 'CreateNotificationUseCaseProxy';

    static register(): DynamicModule {
        return {
            module: UseCasesProxyModule,
            providers: [
                // Auth
                getLoginProvide(UseCasesProxyModule.LOGIN_USECASES_PROXY),
                isAuthenticatedProvide(UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY),
                // Projects
                getProjectProvide(UseCasesProxyModule.GET_PROJECT_USECASES_PROXY),
                getProjectProvide(UseCasesProxyModule.GET_PROJECTS_USECASES_PROXY),
                createProjectProvide(UseCasesProxyModule.CREATE_PROJECT_USECASES_PROXY),
                addMemberProvide(UseCasesProxyModule.ADD_MEMBER_USECASES_PROXY),
                removeMemberProvide(UseCasesProxyModule.REMOVE_MEMBER_USECASES_PROXY),
                // Roles
                getRoleProvide(UseCasesProxyModule.GET_ROLES_USECASES_PROXY),
                createRoleProvide(UseCasesProxyModule.CREATE_ROLE_USECASES_PROXY),
                deleteRoleProvide(UseCasesProxyModule.DELETE_ROLE_USECASES_PROXY),
                // Employees
                getAllProvide(UseCasesProxyModule.GET_EMPLOYEES_USECASES_PROXY),
                getOneProvide(UseCasesProxyModule.GET_EMPLOYEE_USECASES_PROXY),
                createEmployeeProvide(UseCasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY),
                updateEmployeeProvide(UseCasesProxyModule.UPDATE_EMPLOYEE_USECASES_PROXY),
                deleteEmployeeProvide(UseCasesProxyModule.DELETE_EMPLOYEE_USECASES_PROXY),
                // Permissions
                getPermissionsProvide(UseCasesProxyModule.GET_PERMISSIONS_USECASES_PROXY),
                addPermToRoleProvide(UseCasesProxyModule.ADD_PERM_TO_ROLE_USECASES_PROXY),
                // Vacations
                getVacationsProvide(UseCasesProxyModule.GET_VACATIONS_USECASES_PROXY),
                createVacationProvide(UseCasesProxyModule.CREATE_VACATIONS_USECASES_PROXY),
                changeStatusProvide(UseCasesProxyModule.CHANGE_STATUS_USECASES_PROXY),
                // News
                getNewsProvide(UseCasesProxyModule.GET_NEWS_USECASES_PROXY),
                createNewProvide(UseCasesProxyModule.CREATE_NEW_USECASES_PROXY),
                // lunch order
                getLunchOrderProvide(UseCasesProxyModule.GET_LUNCH_ORDER_USECASES_PROXY),
                // Candidate
                createCandidateProvide(UseCasesProxyModule.CREATE_CANDIDATE_USECASES_PROXY),
                getCandidateProvide(UseCasesProxyModule.GET_CANDIDATE_USECASES_PROXY),
                getCandidatesProvide(UseCasesProxyModule.GET_CANDIDATES_USECASES_PROXY),
                // Notification
                createNotificationProvide(UseCasesProxyModule.CREATE_NOTIFICATION_USECASES_PROXY),
                getNotificationsProvide(UseCasesProxyModule.GET_NOTIFICATION_USECASES_PROXY),
            ],
            exports: [
                // Auths
                UseCasesProxyModule.LOGIN_USECASES_PROXY,
                UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
                // Projects
                UseCasesProxyModule.GET_PROJECT_USECASES_PROXY,
                UseCasesProxyModule.GET_PROJECTS_USECASES_PROXY,
                UseCasesProxyModule.CREATE_PROJECT_USECASES_PROXY,
                UseCasesProxyModule.ADD_MEMBER_USECASES_PROXY,
                UseCasesProxyModule.REMOVE_MEMBER_USECASES_PROXY,
                // Roles
                UseCasesProxyModule.GET_ROLES_USECASES_PROXY,
                UseCasesProxyModule.CREATE_ROLE_USECASES_PROXY,
                UseCasesProxyModule.DELETE_ROLE_USECASES_PROXY,
                // Employees
                UseCasesProxyModule.GET_EMPLOYEES_USECASES_PROXY,
                UseCasesProxyModule.GET_EMPLOYEE_USECASES_PROXY,
                UseCasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY,
                UseCasesProxyModule.DELETE_EMPLOYEE_USECASES_PROXY,
                UseCasesProxyModule.UPDATE_EMPLOYEE_USECASES_PROXY,
                // Permissions
                UseCasesProxyModule.GET_PERMISSIONS_USECASES_PROXY,
                UseCasesProxyModule.ADD_PERM_TO_ROLE_USECASES_PROXY,
                // Vacations
                UseCasesProxyModule.GET_VACATIONS_USECASES_PROXY,
                UseCasesProxyModule.CREATE_VACATIONS_USECASES_PROXY,
                UseCasesProxyModule.CHANGE_STATUS_USECASES_PROXY,
                // News
                UseCasesProxyModule.GET_NEWS_USECASES_PROXY,
                UseCasesProxyModule.CREATE_NEW_USECASES_PROXY,
                // Lunch order
                UseCasesProxyModule.GET_LUNCH_ORDER_USECASES_PROXY,
                // Candidates
                UseCasesProxyModule.GET_CANDIDATE_USECASES_PROXY,
                UseCasesProxyModule.GET_CANDIDATES_USECASES_PROXY,
                UseCasesProxyModule.CREATE_CANDIDATE_USECASES_PROXY,
                // Notifications
                UseCasesProxyModule.GET_NOTIFICATION_USECASES_PROXY,
                UseCasesProxyModule.CREATE_NOTIFICATION_USECASES_PROXY,
            ],
        };
    }
}
