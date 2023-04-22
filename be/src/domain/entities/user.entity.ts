import { WorkloadEntity } from './workload.entity';
import { ProjectEntity } from './project.entity';
import { RoleEntity } from './role.entity';
import { User } from 'src/infrastructure/schemas/user.schema';

export class UserWithoutPassword {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
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
    nick_name: string;
    introduce: string;
    vacations: [];
    roles: RoleEntity[];
    projects: ProjectEntity[];
    tasks: [];
    kanbans: [];
}

export class UserEntity extends UserWithoutPassword {
    password: string;
    full_name: string;
    constructor(u?: User) {
        super();
        this.password = u?.password;
    }
}
