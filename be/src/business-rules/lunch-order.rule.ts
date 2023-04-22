import { GetLastDayOfMonth } from 'src/actions/common';

export const LUNCH_TYPE_NO = 1;
export const LUNCH_TYPE_NOMAL = 2;
export const LUNCH_TYPE_LESS_RICE = 3;
export const LUNCH_TYPE_PI = 4;

export function GenerateLunchCalendars(date: Date): string {
    const lunchCalendars = [];
    const onboardDate = new Date(date);
    let onboardDay = onboardDate.getDate();
    const month = onboardDate.getMonth() + 1;
    const year = onboardDate.getFullYear();
    const last = GetLastDayOfMonth(date);

    while (onboardDay <= last.day) {
        lunchCalendars.push({
            date: `${year}-${month > 9 ? month : '0' + month}-${onboardDay > 9 ? onboardDay : '0' + onboardDay}`,
            value: LUNCH_TYPE_NOMAL,
        });
        onboardDay++;
    }

    return JSON.stringify(lunchCalendars);
}
