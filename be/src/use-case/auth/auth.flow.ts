import { IAuth } from 'service/auth.service';
import { IUser } from 'service/user.service';
import { generateAccessToken, generateRefreshToken, getUserNameByToken, compare } from 'util/bcrypt.util';

export class AuthFlow {
    private userService: any;
    private authService: any;
    constructor(userService: IUser, authService: IAuth) {
        this.userService = userService;
        this.authService = authService;
    }

    async login(username: string, password: string) {
        const { status, result } = await this.userService.getUser(username);

        if (status === 'error') {
            return { status: 'error', result: {} };
        }
        const user = result;
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return { status: 'error', result: {} };
        }
        const accessToken = await generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.id);
        await this.authService.setRefreshToken(refreshToken, username);
        await this.authService.updateLoginTime(username);
        return { status: 'success', result: { accessToken, refreshToken } };
    }

    async refreshToken(refresh_token: string) {
        const username = getUserNameByToken(refresh_token);
        const payload = { username: username };
        const accessToken = await generateAccessToken(payload);
        return { status: 'success', result: { accessToken } };
    }
}
