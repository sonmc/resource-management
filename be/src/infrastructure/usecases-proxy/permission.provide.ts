import { PermissionRepository } from 'src/presentation/repositories/permission.repository';
import { RolePermRepository } from 'src/presentation/repositories/role-perm.repository';
import { AddRolePermUseCases } from 'src/use-cases/permission/add-role-perm.usecases';
import { GetPermissionsUseCases } from 'src/use-cases/permission/get-all.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';

export function getPermissionsProvide(provide) {
    return {
        inject: [LoggerService, PermissionRepository],
        provide,
        useFactory: (logger: LoggerService, permissionRepository: PermissionRepository) => new UseCaseProxy(new GetPermissionsUseCases(logger, permissionRepository)),
    };
}
export function addPermToRoleProvide(provide) {
    return {
        inject: [LoggerService, RolePermRepository],
        provide,
        useFactory: (logger: LoggerService, rolePermRepository: RolePermRepository) => new UseCaseProxy(new AddRolePermUseCases(logger, rolePermRepository)),
    };
}
