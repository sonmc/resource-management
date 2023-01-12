import { RoleModel } from 'src/domain/model/role';
import { ILogger } from '../../domain/logger/logger.interface';
import { IRoleRepository } from '../../domain/repositories/roleRepository.interface';

export class addTodoUseCases {
    constructor(private readonly logger: ILogger, private readonly roleRepository: IRoleRepository) {}

    async execute(content: string): Promise<RoleModel> {
        const project = new RoleModel();
        project.content = content;
        const result = await this.roleRepository.insert(project);
        this.logger.log('addProjectUseCases execute', 'New project have been inserted');
        return result;
    }
}
