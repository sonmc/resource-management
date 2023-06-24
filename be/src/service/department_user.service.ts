import { getRepository } from 'typeorm';
import { DepartmentSchema } from './schemas/department.schema';
import { DepartmentUserSchema } from './schemas/departments_users';

export interface IDepartmentUser {
    findByUser(user_id: number): Promise<any>;
    list(param: any): Promise<any>;
    create(departmentUser: DepartmentUserSchema): Promise<any>;
    creates(uIds: any, department_id: number): Promise<any>;
}

export class DepartmentUserService implements IDepartmentUser {
    async findByUser(user_id: number): Promise<any> {
        const departmentUserRepo = getRepository(DepartmentUserSchema);
        const departmentUser = await departmentUserRepo.findOne({
            where: {
                user_id: user_id,
            },
        });
        return departmentUser;
    }

    async list(param: any): Promise<any> {
        const departmentRepo = getRepository(DepartmentSchema);
        const departments = await departmentRepo.find();
        return { status: 'success', result: departments };
    }

    async create(de: DepartmentUserSchema): Promise<any> {
        const departmentRepo = getRepository(DepartmentUserSchema);
        const departmentCreated = await departmentRepo.create(de);
        await departmentRepo.save(departmentCreated);
        return { status: 'success', result: departmentCreated };
    }

    async creates(uIds: any, department_id: number): Promise<any> {
        const departmentUserRepo = getRepository(DepartmentUserSchema);
        const departmentUserList: any = [];
        await uIds.forEach(async (id: number) => {
            const de = {
                is_admin: false,
                user_id: id,
                department_id: department_id,
            };
            const deCreated = await departmentUserRepo.create(de);
            departmentUserList.push(deCreated);
        });
        await departmentUserRepo.save(departmentUserList);
        return { status: 'success', result: uIds };
    }
}
