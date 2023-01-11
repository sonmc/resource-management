import { RoleModel } from 'src/domain/model/role';
import { RoleRepository } from '../../domain/repositories/roleRepository.interface';

export class GetTodoUseCases {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(id: number): Promise<RoleModel> {
        return await this.roleRepository.findById(id);
    }
}
