import { IUser } from '../../service/user.service';
import { IDepartment } from '../../service/department.service';
import { getUserNameByToken } from '../../util/bcrypt.util';
import { IDepartmentUser } from '../../service/department_user.service';
import { PROFILE_TYPE } from '../../util/const.variable';
export class DepartmentFlow {
    private userService: IUser;
    private departmentService: IDepartment;
    private departmentUserService: IDepartmentUser;
    constructor(_departmentService: IDepartment, _userService: IUser, _departmentUserService: IDepartmentUser) {
        this.departmentService = _departmentService;
        this.userService = _userService;
        this.departmentUserService = _departmentUserService;
    }

    async list(access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getUser(username);
        const workspace_id = user.workspace.id;
        return this.departmentService.list(workspace_id);
    }

    async create(param: any, access_token: any) {
        const username = getUserNameByToken(access_token);
        const result = await this.userService.getUser(username);
        const user = await this.userService.findOne(param.admin_id);
        let res = null;
        param.workspace = result.workspace;
        if (param.id) {
            res = await this.departmentService.update(param);
            return { status: 'success', result: res.result };
        } else {
            res = await this.departmentService.create(param);
        }
        if (res.status == 'error') {
            return { status: res.status, result: {} };
        }
        const department = res.result;
        const departmentUser = {
            is_admin: true,
            department_id: department.id,
            user_id: user.id,
        };
        await this.departmentUserService.create(departmentUser);
        user.group_ids = JSON.stringify([PROFILE_TYPE.ADMIN_DEPARTMENT]);
        await this.userService.update(user);
        department.admin = user;
        return { status: 'success', result: department };
    }
}

export default DepartmentFlow;
