import { UserEntity } from './user.entity';
export class AddMemberEntity {
    project_id: number;
    start_date: Date;
    end_date: Date;
    workload: number;
    members: UserEntity[];
}
