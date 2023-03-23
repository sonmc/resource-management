export function calculatorWeekNumber(start_date, end_date): number {
    var days = Math.floor((Date.parse(end_date) - Date.parse(start_date)) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

export function calculatorWeekNumberDate(week_number, start_date): any {
    let weekNumberDates = [];
    const week = week_number < 12 ? 12 : week_number;
    for (let index = 0; index < week; index++) {
        const { first_date, last_date } = calculatorFistAndLastDate(start_date);
        const wnd = {
            start_date: first_date,
            end_date: last_date,
        };
        weekNumberDates.push(wnd);
    }
    return weekNumberDates;
}

export function calculatorFistAndLastDate(today: Date): any {
    const first_date = new Date(today.setDate(today.getDate() - today.getDay()));

    const last_date = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return { first_date, last_date };
}
