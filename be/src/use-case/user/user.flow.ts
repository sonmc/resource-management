import { IUser } from 'service/user.service';
import { getUserNameByToken } from '../../util/bcrypt.util';

export class UserFlow {
    private userService: IUser;
    constructor(_userService: IUser) {
        this.userService = _userService;
    }
    async getCurrentUser(access_token: string) {
        const username = getUserNameByToken(access_token);
        const { status, result } = await this.userService.getUser(username);
        return { status, result };
    }

    async getAllUser(param: any) {
        return await this.userService.list(param);
    }
}

export default UserFlow;
