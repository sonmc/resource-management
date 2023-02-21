import { PermissionEntity } from 'src/domain/entities/permission.entity';
import { IPermissionRepository } from 'src/domain/repositories/permission-repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetPermissionsUseCases {
  constructor(private readonly logger: ILogger, private readonly permissionRepository: IPermissionRepository) {}

  async execute(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.findAll();
  }
}
