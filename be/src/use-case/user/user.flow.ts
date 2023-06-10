import { IUser } from 'service/user.service';
import { getUserNameByToken } from 'util/bcrypt.util';

export class UserFlow {
    private userService: any;
    constructor(userService: IUser) {
        this.userService = userService;
    }
    async getCurrentUser(acccess_token: string) {
        const username = getUserNameByToken(acccess_token);
        const { status, result } = await this.userService.getUser(username);
        return { status, result };
    }

    async getAllUser() {
        const { status, result } = await this.userService.list();
        return { status, result };
    }
}
