import { RoleBasePresenter } from 'src/application/presenter-core/role-base.presenter';
import { RoleEntity } from 'src/domain/entities/role.entity';

export function toRoleEntity(roleP: RoleBasePresenter): RoleEntity {
    const roleE: RoleEntity = new RoleEntity();
    roleE.id = roleP.id;
    roleE.name = roleP.name;
    roleE.description = roleP.description;
    return roleE;
}
