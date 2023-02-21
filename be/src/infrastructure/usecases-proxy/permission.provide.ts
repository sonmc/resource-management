import { PermissionRepository } from 'src/presentation/repositories/permission.repository';
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
