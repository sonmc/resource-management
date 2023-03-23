export function calculatorWeekNumber(start_date, end_date): number {
    var days = Math.floor((Date.parse(end_date) - Date.parse(start_date)) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

export function calculatorWeekNumberDate(week_number, start_date): any {
    let weekNumberDates = [];
    for (let index = 0; index < week_number; index++) {
        let date = new Date(start_date);
        date.setDate(date.getDate() + index * 7);
        const { first_date, last_date } = calculatorFistAndLastDate(date);
        const wnd = {
            start_date: first_date,
            end_date: last_date,
        };
        weekNumberDates.push(wnd);
    }
    for (let index = 0; index < 12 - week_number; index++) {
        const wnd = {
            start_date: '',
            end_date: '',
        };
        weekNumberDates.push(wnd);
    }
    return weekNumberDates;
}

export function calculatorFistAndLastDate(dateTime: Date): any {
    const first_date = new Date(dateTime.setDate(dateTime.getDate() - dateTime.getDay()));
    const last_date = new Date(dateTime.setDate(dateTime.getDate() - dateTime.getDay() + 6));
    return { first_date, last_date };
}
