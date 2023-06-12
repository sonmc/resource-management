import { IUser } from 'service/user.service';
import { getUserNameByToken } from 'utils/bcrypt.util';

export class UserFlow {
    private userService: IUser;
    constructor(_userService: IUser) {
        this.userService = _userService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        const { status, result } = await this.userService.getUserByName(username);
        return { status, result };
    }

    async getAllUser() {
        return await this.userService.list();
    }
}

export default UserFlow;
