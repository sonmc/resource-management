import { ILogger } from 'src/domain/logger/logger.interface';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { IRoleRepository } from 'src/domain/repositories/role-repository.interface';

export class GetRolesUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(): Promise<RoleEntity[]> {
        return await this.roleRepository.findAll();
    }
}
