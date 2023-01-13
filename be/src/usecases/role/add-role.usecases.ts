import { RoleEntity } from 'src/domain/entities/role.entity';
import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';

export class addTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(role: RoleEntity): Promise<RoleEntity> {
        const result = await this.roleRepository.insert(role);
        this.logger.log('addProjectUseCases execute', 'New project have been inserted');
        return result;
    }
}
