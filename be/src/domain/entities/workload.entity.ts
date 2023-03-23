import { UserEntity } from './user.entity';

export class WorkloadEntity {
    id: number;
    value: string;
    user_id: number;
    project_id: number;
    start_date: Date;
    end_date: Date;
    user: UserEntity;
}
