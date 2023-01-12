import { RoleModel } from '../../domain/model/role';
import { IRoleRepository } from '../../domain/repositories/roleRepository.interface';

export class getTodosUseCases {
    constructor(private readonly roleRepository: IRoleRepository) {}

    async execute(): Promise<RoleModel[]> {
        return await this.roleRepository.findAll();
    }
}
