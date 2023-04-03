import { WorkloadEntity } from 'src/domain/entities/workload.entity';
import { calculatorWeekNumber, calculatorWeekNumberDate } from 'src/domain/helper/common';

export function generateWorkload(start_date, end_date, user_id: number, value: string, projectId: number): any[] {
    const workloads = [];
    if (start_date && end_date) {
        const fd = new Date(start_date).setHours(0, 0, 0, 0);
        const ld = new Date(end_date).setHours(0, 0, 0, 0);
        const effortWeek = calculatorWeekNumber(new Date(fd), new Date(ld));
        const weekNumberDate = calculatorWeekNumberDate([], effortWeek, fd);
        for (let index = 0; index < effortWeek; index++) {
            let workload = new WorkloadEntity();
            workload.value = value;
            workload.id = 0;
            workload.user_id = user_id;
            workload.start_date = weekNumberDate[index].start_date;
            workload.end_date = weekNumberDate[index].end_date;
            workload.project_id = projectId;
            workloads.push(workload);
        }
    }
    return workloads;
}

export function generateWorkloadEmpty(user_workloads, start_date, numberWorkload, user_id: number, projectId: number): any[] {
    const workloads = [];
    const fd = new Date(start_date).setHours(0, 0, 0, 0);
    const weekNumberDate = calculatorWeekNumberDate(user_workloads, numberWorkload, new Date(fd));
    for (let index = 0; index < numberWorkload; index++) {
        let workload = new WorkloadEntity();
        workload.value = '';
        workload.id = 0;
        workload.user_id = user_id;
        workload.start_date = weekNumberDate[index].start_date;
        workload.end_date = weekNumberDate[index].end_date;
        workload.project_id = projectId;
        workloads.push(workload);
    }
    return workloads;
}
