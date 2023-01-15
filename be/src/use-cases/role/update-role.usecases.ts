import { RoleEntity } from 'src/domain/entities/role.entity';
import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';

export class updateTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(id: number, roleEntity: RoleEntity): Promise<void> {
        await this.roleRepository.update(id, roleEntity);
        this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
    }
}
