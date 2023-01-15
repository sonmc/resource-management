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
}

export class UserEntity extends UserWithoutPassword {
    password: string;
    constructor(u?: User) {
        super();
        this.password = u?.password;
    }
}
