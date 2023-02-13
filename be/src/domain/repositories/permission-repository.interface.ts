import { RoleEntity } from '../entities/role.entity';

export interface IPermissionRepository {
  create(role: RoleEntity): Promise<RoleEntity>;
  findAll(): Promise<RoleEntity[]>;
  findById(id: number): Promise<RoleEntity>;
  update(id: number, RoleEntity: RoleEntity): Promise<void>;
  deleteById(id: number): Promise<void>;
  findByUserId(userId: number): Promise<RoleEntity[]>;
}
