import { RoleSchema } from 'service/schemas/role.schema';
import { getRepository } from 'typeorm';

export interface IRole {
    getAll(): Promise<RoleSchema[]>;
}
export class RoleService implements IRole {
    async getAll(): Promise<RoleSchema[]> {
        const roleRepo = getRepository(RoleSchema);
        const roles = await roleRepo.find();
        return roles;
    }
}
