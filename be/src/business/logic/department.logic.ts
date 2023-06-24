export function getDepartment(userId: number, workspace: any) {
    let department = { taskGroups: [] };
    workspace.departments.forEach((d: any) => {
        d.taskGroups.forEach((tg: any) => {
            tg.tasks.forEach((t: any) => {
                if (t.implement == userId) {
                    department = d;
                }
            });
        });
    });
    return department;
}
