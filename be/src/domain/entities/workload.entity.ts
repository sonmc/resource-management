import { Workload } from 'src/infrastructure/schemas/workload.schema';
import { UserEntity } from './user.entity';

export class WorkloadEntity {
    id: number;
    value: string;
    start_date: Date;
    user_id: number;
    project_id: number;
    user: UserEntity;

    constructor(w?: Workload) {
        this.id = w?.id;
        this.value = w?.value;
        this.start_date = w?.start_date;
        this.user_id = w?.user.id;
        this.project_id = w?.project_id;
        this.user = new UserEntity(w?.user);
    }
}
