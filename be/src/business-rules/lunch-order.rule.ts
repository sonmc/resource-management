export const LUNCH_TYPE_NO = 1;
export const LUNCH_TYPE_NOMAL = 2;
export const LUNCH_TYPE_LESS_RICE = 3;
export const LUNCH_TYPE_PI = 4;
export function GenerateLunchCalendars(date: Date) {
    const lunchCalendars = [];
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    for (let index = 1; index <= day; index++) {
        lunchCalendars.push({
            date: index + '/' + month + '/' + year,
            value: LUNCH_TYPE_NOMAL,
        });
    }
    return lunchCalendars;
}
