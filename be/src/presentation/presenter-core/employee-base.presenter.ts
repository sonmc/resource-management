import { RoleEntity } from 'src/domain/entities/role.entity';
export class EmployeeBasePresenter {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    status: number;
    gender: boolean;
    avatar: string;
    last_name: string;
    first_name: string;
    dob: Date;
    status_level: string;
    chapterHead: number;
    onboarding: Date;
    roles: RoleEntity[];
    full_name: string;
    constructor() {
        this.full_name = this.first_name + ' ' + this.last_name;
    }
}
