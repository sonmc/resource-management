import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_ID } from 'src/business-rules/role.rule';
import { Repository, LessThan } from 'typeorm';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';
import { Role } from '../../infrastructure/schemas/Role.schema';
import { RoleEntity } from 'src/domain/entities/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>
    ) {}

    async update(id: number, roleDto: RoleEntity): Promise<void> {
        // await this.repository.update({
        //     id: id,
        // });
    }

    async insert(role: RoleEntity): Promise<RoleEntity> {
        const roleSchema = this.toRoleEntity(role);
        const result = await this.repository.insert(roleSchema);
        const r = result.generatedMaps[0] as Role;
        const roleDto = new RoleEntity(r);
        return roleDto;
    }

    async findAll() {
        const datas = await this.repository.find({
            where: {
                id: LessThan(ADMIN_ID),
            },
        });
        const roles = datas.map((r) => new RoleEntity(r));
        return roles;
    }

    async findById(id: number): Promise<RoleEntity> {
        const roleSchema = await this.repository.findOneOrFail(id);
        const roleDto = new RoleEntity(roleSchema);
        return roleDto;
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id: id });
    }

    private toRoleEntity(role: RoleEntity): Role {
        const roleEntity: Role = new Role();

        roleEntity.id = role.id;

        return roleEntity;
    }
}
