import { RoleRepository } from 'src/presentation/repositories/role.repository';
import { CreateRoleUseCases } from 'src/usecases/role/create-role.usecases';
import { DeleteRoleUseCases } from 'src/usecases/role/delete-role.usecases';
import { GetRolesUseCases } from 'src/usecases/role/get-roles.usecases';
import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';

export function getRoleProvide(provide) {
    return {
        inject: [LoggerService, RoleRepository],
        provide,
        useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new GetRolesUseCases(logger, RoleRepository)),
    };
}
export function createRoleProvide(provide) {
    return {
        inject: [LoggerService, RoleRepository],
        provide,
        useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new CreateRoleUseCases(logger, RoleRepository)),
    };
}
export function deleteRoleProvide(provide) {
    return {
        inject: [LoggerService, RoleRepository],
        provide,
        useFactory: (logger: LoggerService, RoleRepository: RoleRepository) => new UseCaseProxy(new DeleteRoleUseCases(logger, RoleRepository)),
    };
}
