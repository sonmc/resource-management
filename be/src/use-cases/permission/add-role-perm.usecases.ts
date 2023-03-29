import { RolePermEntity } from 'src/domain/entities/role-pems.entity';
import { IRolePermRepository } from 'src/domain/repositories/role-perm-repository.interface';
import { RolePermissionPresenter } from 'src/presentation/controllers/role-perm/presenter/role-perm.presenter';
import { ILogger } from '../../domain/logger/logger.interface';

export class AddRolePermUseCases {
    constructor(private readonly logger: ILogger, private readonly rolePermRepository: IRolePermRepository) {}

    async execute(rolePerm: RolePermissionPresenter): Promise<any> {
        if (rolePerm.perm_ids.length > 0) {
            Promise.all(
                rolePerm.perm_ids.map(async (id) => {
                    const rp = new RolePermEntity();
                    rp.role_id = rolePerm.role_id;
                    rp.permission_id = id;
                    await this.rolePermRepository.create(rp);
                })
            );
        } else {
            const rolePerms = await this.rolePermRepository.findByRoleId(rolePerm.role_id);
            await this.rolePermRepository.removeAll(rolePerms);
        }
        return null;
    }
}
