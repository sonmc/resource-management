import { RoleModel } from 'src/domain/model/role';
import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/roleRepository.interface';

export class updateTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(id: number, roleModel: RoleModel): Promise<void> {
        await this.roleRepository.update(id, roleModel);
        this.logger.log('updateTodoUseCases execute', `Todo ${id} have been updated`);
    }
}
