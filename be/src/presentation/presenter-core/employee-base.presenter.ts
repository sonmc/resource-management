import { ProjectEntity } from 'src/domain/entities/project.entity';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { WorkloadEntity } from 'src/domain/entities/workload.entity';
export class EmployeeBasePresenter {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    password: string;
    status: number;
    gender: boolean;
    avatar: string;
    dob: Date;
    address: string;
    last_login?: Date;
    hash_refresh_token: string;
    onboarding: Date;
    status_level: string;
    chapterHead: number;
    workloads: WorkloadEntity[];
    news: [];
    vacations: [];
    roles: RoleEntity[];
    projects: ProjectEntity[];
    tasks: [];
    kanbans: [];
    full_name: string;
    constructor() {
        this.full_name = (this.first_name || '') + ' ' + (this.last_name || '');
    }
}
