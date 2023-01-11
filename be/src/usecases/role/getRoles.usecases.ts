import { RoleModel } from '../../domain/model/role';
import { RoleRepository } from '../../domain/repositories/roleRepository.interface';

export class getTodosUseCases {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(): Promise<RoleModel[]> {
        return await this.roleRepository.findAll();
    }
}
