import { WorkloadEntity } from './workload.entity';
import { ProjectEntity } from './project.entity';
import { RoleEntity } from './role.entity';
import { User } from 'src/infrastructure/schemas/user.schema';

export class UserWithoutPassword {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    status: number;
    gender: boolean;
    avatar: string;
    dob: Date;
    role_id: number;
    role: RoleEntity;
    hash_refresh_token: string;
    workloads: WorkloadEntity[];
    projects: ProjectEntity[];
    constructor(u?: User) {
        this.id = u?.id;
        this.username = u?.username;
        this.email = u?.email;
        this.phone_number = u?.phone_number;
        this.avatar = u?.avatar;
        this.role = u?.role;
        this.role_id = u?.role.id;
        this.hash_refresh_token = u?.hash_refresh_token;
        this.workloads = u?.workloads?.map((w) => new WorkloadEntity(w));
        this.projects = u?.projects?.map((p) => new ProjectEntity(p));
    }
}

export class UserEntity extends UserWithoutPassword {
    password: string;
    constructor(u?: User) {
        super();
        this.password = u?.password;
    }
}
