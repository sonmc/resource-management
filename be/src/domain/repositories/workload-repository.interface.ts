import { UserEntity } from '../entities/user.entity';
import { WorkloadEntity } from '../entities/workload.entity';

export interface IWorkloadRepository {
    findAll(): Promise<WorkloadEntity[]>;
    create(workload: WorkloadEntity): Promise<WorkloadEntity>;
    save(workloads: WorkloadEntity[]): Promise<WorkloadEntity>;
}
