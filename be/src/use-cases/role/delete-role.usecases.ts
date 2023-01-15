import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';

export class DeleteRoleUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(id: number): Promise<number> {
        await this.roleRepository.deleteById(id);
        this.logger.log('deleteRoleUseCases execute', `Role ${id} have been deleted`);
        return id;
    }
}
