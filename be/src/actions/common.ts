export function calculatorWeekNumber(start_date, end_date): number {
    var days = Math.floor((Date.parse(end_date) - Date.parse(start_date)) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

export function checkWorkloadExist(user_workloads, first_date) {
    let isExist = false;
    for (let i = 0; i < user_workloads.length; i++) {
        const fd = new Date(first_date).getTime();
        const sd = new Date(user_workloads[i].start_date).getTime();
        if (fd == sd) {
            isExist = true;
            break;
        } else {
            isExist = false;
        }
    }
    return isExist;
}

export function calculatorWeekNumberDate(user_workloads, week_number, start_date): any {
    let weekNumberDates = [];
    for (let index = 0; index < week_number + user_workloads.length; index++) {
        let date = new Date(start_date);
        date.setDate(date.getDate() + index * 7);
        const { first_date, last_date } = calculatorFistAndLastDate(date);
        const isExist = checkWorkloadExist(user_workloads, first_date);
        if (!isExist) {
            const wnd = {
                start_date: first_date,
                end_date: last_date,
            };
            weekNumberDates.push(wnd);
        }
    }
    return weekNumberDates;
}

export function calculatorFistAndLastDate(dateTime: Date): any {
    const first_date = new Date(dateTime.setDate(dateTime.getDate() - dateTime.getDay()));
    const last_date = new Date(dateTime.setDate(dateTime.getDate() - dateTime.getDay() + 6));
    return { first_date, last_date };
}

export function GetLastDayOfMonth(date: Date): any {
    const currentDate = new Date(date);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    var d = new Date(year, month, 0);
    return { day: d.getDate(), date: d };
}

export function GetFileExtension(filename) {
    if (filename.length == 0) return '';
    var dot = filename.lastIndexOf('.');
    if (dot == -1) return '';
    var extension = filename.substr(dot, filename.length);
    return extension;
}
