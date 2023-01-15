import { RoleEntity } from 'src/domain/entities/role.entity';
import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';

export class CreateRoleUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(role: RoleEntity): Promise<RoleEntity> {
        const result = await this.roleRepository.create(role);
        this.logger.log('createRoleUseCases execute', 'New role have been inserted');
        return result;
    }
}
