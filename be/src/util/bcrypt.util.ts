import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function hash(password: string): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}

export function generateAccessToken(payload: any) {
    const secretKey = process.env.JWT_SECRET || '';
    const expiresIn = process.env.JWT_EXPIRATION_TIME + 's';
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
}

export function generateRefreshToken(payload: any) {
    const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || '';
    const expiresInForRefreshToken = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME + 's';
    return jwt.sign(payload, secretKeyRefreshToken, { expiresIn: expiresInForRefreshToken });
}

export function verify(token: string) {
    const secretKey = process.env.JWT_SECRET || '';
    return jwt.verify(token, secretKey);
}

export function getUserNameByToken(token: string): string {
    const decoded: any = jwt.decode(token);
    return decoded.username;
}
