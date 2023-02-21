import { PermissionEntity } from '../entities/permission.entity';

export interface IPermissionRepository {
  create(role: PermissionEntity): Promise<PermissionEntity>;
  findAll(): Promise<PermissionEntity[]>;
  findById(id: number): Promise<PermissionEntity>;
  update(id: number, permissionEntity: PermissionEntity): Promise<void>;
  deleteById(id: number): Promise<void>;
  findByUserId(userId: number): Promise<PermissionEntity[]>;
}
