import { getRepository } from 'typeorm';
import { PermSchema } from 'service/schemas/perm.schema';

export interface IPerm {
    update(perm: PermSchema): Promise<any>;
    getLastId(): Promise<any>;
    isPermExist(name: string): Promise<any>;
    updateFromRouter(routers: any): Promise<any>;
}
export class PermService implements IPerm {
    async updateFromRouter(routers: any): Promise<any> {
        const permRepo = getRepository(PermSchema);
        const lastId = await this.getLastId();
        let index = 0;
        routers.forEach(async (r: any) => {
            const perm = await this.isPermExist(r.path);
            index += 1;
            if (perm != null) {
                const p = new PermSchema();
                p.id = lastId + index;
                p.label = r.path;
                permRepo.save(p);
            }
        });
        return { status: 'success', result: null };
    }

    async isPermExist(name: string): Promise<any> {
        const permRepo = getRepository(PermSchema);
        const perm = (await permRepo.findOne({
            where: {
                name: name,
            },
        })) as PermSchema;
        return perm;
    }

    async getLastId(): Promise<any> {
        const permRepo = getRepository(PermSchema);
        const perm = (await permRepo.findOne({
            order: {
                id: 'DESC',
            },
        })) as PermSchema;

        return perm ? perm.id : 0;
    }

    async update(perm: PermSchema): Promise<any> {
        const permRepo = getRepository(PermSchema);
        permRepo.save(perm);
        return { status: 'success', result: perm };
    }
}

export default new PermService();
