import { WorkloadEntity } from '../entities/workload.entity';

export interface IWorkloadRepository {
    findAll(): Promise<WorkloadEntity[]>;
    create(workload: WorkloadEntity): Promise<WorkloadEntity>;
    findByProjectIdUserId(project_id, user_id): Promise<WorkloadEntity[]>;
}
