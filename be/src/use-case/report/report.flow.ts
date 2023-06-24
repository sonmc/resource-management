import { IUser } from '../../service/user.service';
import { ITask } from '../../service/task.service';

export class ReportFlow {
    private userService: IUser;
    private taskService: ITask;
    constructor(_taskService: ITask, _userService: IUser) {
        this.userService = _userService;
        this.taskService = _taskService;
    }

    async list(start: any, end: any) {
        const report = await this.taskService.getReport(start, end);
        return report;
    }
}

export default ReportFlow;
