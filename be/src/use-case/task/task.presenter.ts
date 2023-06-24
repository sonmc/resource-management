import { format } from '../../util/date.util';
export class TaskPresenter {
    title: string = '';
    description: string = '';
    assigned: number = 0;
    point: number = 0;

    static presentList(items: any) {
        const result: any = [];
        items.forEach((item: any) => {
            result.push(this.presentItem(item));
        });
        return result;
    }

    static presentItem(item: any) {
        return {
            id: item.id,
            title: item.title,
            description: item.description || '',
            assigned: item.assigned,
            start_date: format(item.start_date),
            end_date: format(item.end_date),
            creator: item.creator,
            user: item.user || { username: '' },
            status: item.status,
        };
    }
}
