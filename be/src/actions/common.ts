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
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function getFormattedDate(date?, prefomattedDate?, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

// --- Main function
export function timeAgo(dateParam) {
    if (!dateParam) {
        return null;
    }
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today.getDate() - DAY_IN_MS);
    const seconds = Math.round((today.getDate() - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
}
