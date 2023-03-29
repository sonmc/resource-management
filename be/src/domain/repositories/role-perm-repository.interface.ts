import { RolePermEntity } from '../entities/role-pems.entity';

export interface IRolePermRepository {
    create(rolePerm: RolePermEntity);
    findByRoleId(role_id: number);
    removeAll(rp: RolePermEntity[]);
}
