import { WorkloadEntity } from 'src/domain/entities/workload.entity';
import { calculatorWeekNumber, calculatorWeekNumberDate } from 'src/domain/helper/common';

export function generateWorkload(weekInCurrentMonth, start_date, end_date, user_id: number, value: string, projectId: number): any[] {
    const workloads = [];
    if (start_date && end_date) {
        const effortWeek = calculatorWeekNumber(start_date, end_date);
        const weekNumber = effortWeek < weekInCurrentMonth ? weekInCurrentMonth : effortWeek;
        const weekNumberDate = calculatorWeekNumberDate(weekNumber, start_date);

        for (let index = 0; index < weekNumber; index++) {
            let workload = new WorkloadEntity();
            workload.id = 0;
            workload.value = index < effortWeek ? value : '';
            workload.user_id = user_id;
            workload.start_date = weekNumberDate[index].start_date;
            workload.end_date = weekNumberDate[index].end_date;
            workload.project_id = projectId;
            workloads.push(workload);
        }
    } else {
        for (let index = 0; index < weekInCurrentMonth; index++) {
            let workload = new WorkloadEntity();
            workload.id = 0;
            workload.value = '';
            workload.user_id = user_id;
            workload.start_date = null;
            workload.end_date = null;
            workload.project_id = projectId;
            workloads.push(workload);
        }
    }
    return workloads;
}
