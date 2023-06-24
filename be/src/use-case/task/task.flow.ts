import { getUserNameByToken } from '../../util/bcrypt.util';
import { IDepartment } from '../../service/department.service';
import { ITask } from '../../service/task.service';
import { IUser } from '../../service/user.service';

export class TaskFlow {
    private taskService: ITask;
    private userService: IUser;
    private departmentService: IDepartment;
    constructor(_taskService: ITask, _userService: IUser, _departmentService: IDepartment) {
        this.taskService = _taskService;
        this.userService = _userService;
        this.departmentService = _departmentService;
    }

    async get(param: any) {
        return await this.taskService.get(param);
    }
    async list(param: any, access_token: string) {
        const username = getUserNameByToken(access_token);
        const user = await this.userService.getUser(username);
        return await this.taskService.list(param, user);
    }

    async create(param: any, access_token: string) {
        const username = getUserNameByToken(access_token);
        const creator = await this.userService.getUser(username);
        const department = await this.departmentService.findOne(param.departmentId);
        let result: any = null;
        if (param.id) {
            result = await this.taskService.update({ ...param, department: department });
        } else {
            const user = param.implement ? await this.userService.findOne(param.implement) : { id: 0 };
            const task: any = {
                title: param.title,
                description: param.description,
                department: department,
                implement: user.id,
                index: 1,
                status: 0,
                creator_id: creator.id,
                start_date: param.start_date,
                end_date: param.end_date,
                point: param.point,
            };
            result = await this.taskService.create(task);
        }
        const user = await this.userService.findOne(result.implement);
        result.user = user;
        const user2 = await this.userService.findOne(result.creator_id);
        result.creator = user2;
        return { status: 'success', result: result };
    }
}

export default TaskFlow;
