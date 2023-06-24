import { Min, Max } from 'class-validator';
import { UserSchema } from 'service/schemas/user.schema';
export class DepartmentPresenter {
    @Min(0)
    @Max(30)
    name: string = '';
    description: string = '';
    users: UserSchema[] = [];
    admin: UserSchema | undefined;

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
            name: item.name,
            description: item.description,
            users: item.users.length > 0 ? item.users.filter((u: any) => u.id != item.id) : [],
            admin: item.users.find((u: any) => u.id == item.admin_id),
        };
    }
}
