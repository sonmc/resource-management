import { WorkloadEntity } from 'src/domain/entities/workload.entity';

export function generateWorkload(user_id: number, value: string, start_Date: Date, projectId: number) {
    const workloads = [];
    for (let index = 0; index < 12; index++) {
        let workload = new WorkloadEntity();
        workload.id = 0;
        workload.start_date = start_Date;
        workload.value = value;
        workload.user_id = user_id;
        workload.project_id = projectId;
        workloads.push(workload);
    }
    return workloads;
}
