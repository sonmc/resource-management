import { RoleModel } from '../model/role';

export interface RoleRepository {
    insert(role: RoleModel): Promise<RoleModel>;
    findAll(): Promise<RoleModel[]>;
    findById(id: number): Promise<RoleModel>;
    update(id: number): Promise<void>;
    deleteById(id: number): Promise<void>;
}
