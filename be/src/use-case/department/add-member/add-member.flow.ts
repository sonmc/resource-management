import { IDepartmentUser } from '../../../service/department_user.service';

export class AddMemberFlow {
    private departmentUserService: IDepartmentUser;
    constructor(_departmentUserService: IDepartmentUser) {
        this.departmentUserService = _departmentUserService;
    }

    addMember(param: any) {
        const ids = param.ids;
        const department_id = param.departmentId;
        return this.departmentUserService.creates(ids, department_id);
    }
}

export default AddMemberFlow;
