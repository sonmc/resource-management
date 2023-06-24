import { getRepository } from 'typeorm';
import { DepartmentSchema } from './schemas/department.schema';

export interface IDepartment {
    findOne(id: number): Promise<any>;
    list(param: any): Promise<any>;
    delete(id: string): Promise<void>;
    create(department: DepartmentSchema): Promise<any>;
    update(department: DepartmentSchema): Promise<any>;
}

export class DepartmentService implements IDepartment {
    async findOne(id: number): Promise<any> {
        const departmentRepo = getRepository(DepartmentSchema);
        return await departmentRepo.findOne(id);
    }
    async delete(id: string): Promise<any> {
        return { status: 'success', result: id };
    }

    async list(workspace_id: any): Promise<any> {
        const departmentRepo = getRepository(DepartmentSchema);
        const queryBuilder = departmentRepo.createQueryBuilder('d');
        queryBuilder.leftJoinAndSelect('d.users', 'u').where('d.workspaceId = :workspaceId', { workspaceId: workspace_id });
        const departments = await queryBuilder.getMany();
        return { status: 'success', result: departments };
    }

    async create(de: DepartmentSchema): Promise<any> {
        const departmentRepo = getRepository(DepartmentSchema);
        const departmentCreated = departmentRepo.create(de);
        await departmentRepo.save(departmentCreated);
        return { status: 'success', result: departmentCreated };
    }
    async update(de: DepartmentSchema): Promise<any> {
        const departmentRepo = getRepository(DepartmentSchema);
        const departmentUpdated = await departmentRepo.update(de.id,de);
        return { status: 'success', result: departmentUpdated };
    }
}
