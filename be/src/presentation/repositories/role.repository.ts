import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ADMIN_ID } from 'src/business-rules/role.rule';
import { Repository, MoreThan, Not, Equal } from 'typeorm';
import { IRoleRepository } from '../../domain/repositories/role-repository.interface';
import { Role } from '../../infrastructure/schemas/role.schema';
import { RoleEntity } from 'src/domain/entities/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>
    ) {}

    async findByUserId(userId: number): Promise<RoleEntity[]> {
        throw new Error('Method not implemented.');
    }

    async update(id: number, roleDto: RoleEntity): Promise<void> {
        // await this.repository.update({
        //     id: id,
        // });
    }

    async create(role: RoleEntity): Promise<RoleEntity> {
        const roleSchema = plainToClass(Role, role);
        const result = await this.repository.create(roleSchema);
        await this.repository.save(result);
        const roleE = plainToClass(RoleEntity, result);
        return roleE;
    }

    async findAll() {
        const datas = await this.repository.find({
            where: {
                id: Not(Equal(ADMIN_ID)),
            },
        });
        const roles = datas.map((r) => plainToClass(RoleEntity, r));
        return roles;
    }

    async findById(id: number): Promise<RoleEntity> {
        const roleSchema = await this.repository.findOneOrFail(id);
        const roleE = plainToClass(RoleEntity, roleSchema);
        return roleE;
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
