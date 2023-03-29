import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/infrastructure/schemas/permission.schema';
import { plainToClass } from 'class-transformer';
import { IRolePermRepository } from 'src/domain/repositories/role-perm-repository.interface';
import { RolePermEntity } from 'src/domain/entities/role-pems.entity';
import { RolePem } from 'src/infrastructure/schemas/role-pems.schema';

@Injectable()
export class RolePermRepository implements IRolePermRepository {
    constructor(
        @InjectRepository(RolePem)
        private readonly repository: Repository<RolePem>
    ) {}

    async removeAll(rps: RolePermEntity[]): Promise<void> {
        await this.repository.remove(rps);
    }

    async findByRoleId(role_id: number) {
        const rolePerms = await this.repository.find({
            where: {
                role_id: role_id,
            },
        });
        return rolePerms;
    }

    async create(rolePermE: RolePermEntity): Promise<RolePermEntity> {
        const rolePerm = plainToClass(RolePem, rolePermE);
        const result = await this.repository.create(rolePerm);
        await this.repository.save(result);
        return plainToClass(RolePermEntity, result);
    }
}
