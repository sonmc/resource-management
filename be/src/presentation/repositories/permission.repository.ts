import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { IPermissionRepository } from 'src/domain/repositories/permission-repository.interface';
import { Permission } from 'src/infrastructure/schemas/permission.schema';
import { PermissionEntity } from 'src/domain/entities/permission.entity';
import { ADMIN_ID } from 'src/business-rules/employee.rule';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>
  ) {}
  create(role: PermissionEntity): Promise<PermissionEntity> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<PermissionEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: number, permissionEntity: PermissionEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByUserId(userId: number): Promise<PermissionEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<PermissionEntity[]> {
    const datas = await this.repository.find();
    const permissions = await datas.map((r) => plainToClass(PermissionEntity, r));
    return permissions;
  }

  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
