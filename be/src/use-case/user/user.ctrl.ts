import { UserService } from 'service/user.service';
import { UserSchema } from 'service/schemas/user.schema';
import { UserPresenter } from './user.presenter';
import { UserFlow } from './user.flow';

export async function getCurrentUser(req: any, res: any, next: any) {
    const flow = new UserFlow(new UserService());
    const access_token = req.cookies['access-token'];
    const { status, result } = await flow.getCurrentUser(access_token);
    const userPresenter = new UserPresenter(result);
    res.json(userPresenter);
}

export async function getAllUser(req: any, res: any, next: any) {
    const flow = new UserFlow(new UserService());
    const { status, result } = await flow.getAllUser();
    const users = result.map((u: UserSchema) => {
        return new UserPresenter(u);
    });
    res.json(users);
}
