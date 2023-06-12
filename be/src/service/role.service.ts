import { Role } from 'service/schemas/role.schema';
import { getRepository } from 'typeorm';

export interface IRole {
    getAll(): Promise<Role[]>;
}
export class RoleService implements IRole {
    async getAll(): Promise<Role[]> {
        const roleRepo = getRepository(Role);
        const roles = await roleRepo.find();
        return roles;
    }
}
