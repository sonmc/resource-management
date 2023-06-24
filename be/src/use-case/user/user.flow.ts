import { IUser } from '../../service/user.service';
import { getUserNameByToken } from '../../util/bcrypt.util';
import { IWorkspace } from 'service/workspace.service';

export class UserFlow {
    private userService: IUser;
    private workspaceService: IWorkspace;
    constructor(_userService: IUser, _workspaceService: IWorkspace) {
        this.userService = _userService;
        this.workspaceService = _workspaceService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getUser(username);
        return user;
    }

    async create(user: any, access_token: string) {
        const username = getUserNameByToken(access_token);
        const result = await this.userService.getUser(username);
        user.workspace = result.workspace;
        return await this.userService.create(user);
    }

    async list(param: any) {
        const username = getUserNameByToken(param.access_token);
        const result = await this.userService.getUser(username);
        const workspace_id = result.workspace.id;
        return this.userService.list(workspace_id, result.group_ids);
    }
}

export default UserFlow;
