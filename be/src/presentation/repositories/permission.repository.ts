import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_ID } from 'src/business-rules/role.rule';
import { Repository, MoreThan } from 'typeorm';
import { Role } from '../../infrastructure/schemas/Role.schema';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { IPermissionRepository } from 'src/domain/repositories/permission-repository.interface';
import { Permission } from 'src/infrastructure/schemas/permission.schema';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>
  ) {}
  create(role: RoleEntity): Promise<RoleEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<RoleEntity[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<RoleEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: number, RoleEntity: RoleEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByUserId(userId: number): Promise<RoleEntity[]> {
    throw new Error('Method not implemented.');
  }
}
