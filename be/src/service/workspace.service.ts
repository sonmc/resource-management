import { Not, getRepository } from 'typeorm';
import { WorkspaceSchema } from './schemas/workspace.schema';
import { WORKSPACE_ADMIN } from '../business/rule/workspace_rule';

export interface IWorkspace {
    list(param: any): Promise<any>;
    delete(id: string): Promise<void>;
    create(user: WorkspaceSchema): Promise<any>;
    get(name: string): Promise<WorkspaceSchema>;
}

export class WorkspaceService implements IWorkspace {
    async get(name: string): Promise<any> {
        const workspaceRepo = getRepository(WorkspaceSchema);
        const workspace = await workspaceRepo.findOne();
        return workspace;
    }
    async delete(id: string): Promise<any> {
        return { status: 'success', result: id };
    }

    async list(param: any): Promise<any> {
        const workspaceRepo = getRepository(WorkspaceSchema);
        const workspaces = await workspaceRepo.find({ where: { id: Not(WORKSPACE_ADMIN) } });
        return { status: 'success', result: workspaces };
    }

    async create(user: WorkspaceSchema): Promise<any> {
        const workspaceRepo = getRepository(WorkspaceSchema);
        const workspaceCreated = await workspaceRepo.create(user);
        await workspaceRepo.save(workspaceCreated);
        return { status: 'success', result: workspaceCreated };
    }
}
