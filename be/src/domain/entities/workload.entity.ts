import { Workload } from 'src/infrastructure/schemas/workload.schema';
import { UserEntity } from './user.entity';

export class WorkloadEntity {
    id: number;
    value: string;
    user_id: number;
    project_id: number;
    user: UserEntity;
}
