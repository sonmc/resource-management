import { RoleModel } from 'src/domain/model/role';
import { IRoleRepository } from '../../domain/repositories/roleRepository.interface';

export class GetTodoUseCases {
    constructor(private readonly roleRepository: IRoleRepository) {}

    async execute(id: number): Promise<RoleModel> {
        return await this.roleRepository.findById(id);
    }
}
