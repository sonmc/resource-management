import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleModel } from 'src/domain/model/Role';
import { Repository } from 'typeorm';
import { IRoleRepository } from '../../domain/repositories/RoleRepository.interface';
import { Role } from '../../infrastructure/schemas/Role.schema';

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>
    ) {}

    async update(id: number, roleModel: RoleModel): Promise<void> {
        // await this.repository.update({
        //   id: id,
        // });
    }
    async insert(role: RoleModel): Promise<RoleModel> {
        const roleEntity = this.toRoleEntity(role);
        const result = await this.repository.insert(roleEntity);
        return this.toRole(result.generatedMaps[0] as Role);
    }
    async findAll(): Promise<RoleModel[]> {
        const rolesEntity = await this.repository.find();
        return rolesEntity.map((roleEntity) => this.toRole(roleEntity));
    }
    async findById(id: number): Promise<RoleModel> {
        const roleEntity = await this.repository.findOneOrFail(id);
        return this.toRole(roleEntity);
    }
    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id: id });
    }

    private toRole(roleEntity: Role): RoleModel {
        const role: RoleModel = new RoleModel();

        role.id = roleEntity.id;

        return role;
    }

    private toRoleEntity(role: RoleModel): Role {
        const roleEntity: Role = new Role();

        roleEntity.id = role.id;

        return roleEntity;
    }
}
