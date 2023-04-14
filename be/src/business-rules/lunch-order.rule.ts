export const LUNCH_TYPE_NO = 1;
export const LUNCH_TYPE_NOMAL = 2;
export const LUNCH_TYPE_LESS_RICE = 3;
export const LUNCH_TYPE_PI = 4;

export function GetLastDayOfMonth(date: Date): number {
    const currentDate = new Date(date);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    var d = new Date(year, month, 0);
    const lastDay = d.getDate();
    return lastDay;
}

export function GenerateLunchCalendars(date: Date): string {
    const lunchCalendars = [];
    const onboardDate = new Date(date);
    let onboardDay = onboardDate.getDate();
    const month = onboardDate.getMonth() + 1;
    const year = onboardDate.getFullYear();
    const maxDayOfMonth = GetLastDayOfMonth(date);

    while (onboardDay <= maxDayOfMonth) {
        lunchCalendars.push({
            date: onboardDay + '/' + month + '/' + year,
            value: LUNCH_TYPE_NOMAL,
        });
        onboardDay++;
    }

    return JSON.stringify(lunchCalendars);
}
