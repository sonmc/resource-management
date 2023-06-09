import { RoleSchema } from "../../../database/schemas/role.schema";


export class UserPresenter {
    username: string = '';
    full_name: string = '';
    email: string = '';
    roles: RoleSchema[];
    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.roles = user.roles;
        this.full_name = user.full_name;
    }
}
