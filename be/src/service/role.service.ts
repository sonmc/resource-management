import { RoleSchema } from './schemas/role.schema';
import { getRepository } from 'typeorm';

export interface IRole {
    getAll(): Promise<RoleSchema[]>;
}
export class RoleService implements IRole {
    async getAll(): Promise<any> {
        const roleRepo = getRepository(RoleSchema);
        const roles = await roleRepo.find();
        return { status: 'success', result: roles };
    }
}
