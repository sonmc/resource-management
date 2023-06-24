import { IUser } from '../../service/user.service';
import { IWorkspace } from '../../service/workspace.service';

export class WorkspaceFlow {
    private workspaceService: IWorkspace;
    private userService: IUser;
    constructor(_workspaceService: IWorkspace, _userService: IUser) {
        this.workspaceService = _workspaceService;
        this.userService = _userService;
    }

    list(param: any) {
        return this.workspaceService.list(param);
    }

    async create(param: any) {
        let { status, result } = await this.workspaceService.create(param);
        if (status == 'error') {
            return { status, result };
        }
        const admin_id = param.admin_id;
        const user = await this.userService.findOne(admin_id);
        user.workspace = result;
        user.is_owner = true;
        user.group_ids = '[2]';
        const res = await this.userService.update(user);
        result = { ...result, users: [res.result] };
        return { status: 'success', result: result };
    }
}

export default WorkspaceFlow;
