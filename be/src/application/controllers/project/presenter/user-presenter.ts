import { UserEntity } from 'src/domain/entities/user.entity';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { WorkloadEntity } from 'src/domain/entities/workload.entity';

export class UserPresenter {
    id: number;
    username: string;
    email: string;
    phone_number: string;
    password: string;
    status: number;
    gender: boolean;
    avatar: string;
    dob: Date;
    role: RoleEntity;
    workloads: WorkloadEntity[];

    constructor(user: UserEntity) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.phone_number = user.phone_number;
        this.password = user.password;
        this.status = user.status;
        this.gender = user.gender;
        this.avatar = user.avatar;
        this.dob = user.dob;
        this.role = user.role;
        this.workloads = user.workloads;
    }
}
