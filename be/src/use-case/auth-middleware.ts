import { verify } from 'util/bcrypt.util';

export const verifyToken = (req: any, res: any, next: any) => {
    const access_token = req.cookies['access-token'];
    if (access_token) {
        const res = verify(access_token);
        if (res) next();
    } else {
        return res.sendStatus(401);
    }
};
