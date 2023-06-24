export function format(dateStr: string) {
    const formattedDate = new Date(dateStr).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    return formattedDate;
}
