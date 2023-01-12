import { RoleModel } from '../model/role';

export interface IRoleRepository {
    insert(role: RoleModel): Promise<RoleModel>;
    findAll(): Promise<RoleModel[]>;
    findById(id: number): Promise<RoleModel>;
    update(id: number, roleModel: RoleModel): Promise<void>;
    deleteById(id: number): Promise<void>;
}
