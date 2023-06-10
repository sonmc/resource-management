import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hash(hashString: string): Promise<string> {
  return await bcrypt.hash(hashString, 10);
}

export async function compare(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

export function generateAccessToken(payload: any) {
  const secretKey = process.env.JWT_SECRET || "";
  let token = "";
  try {
    token = jwt.sign(payload, secretKey);
  } catch (error) {
    console.log(error);
  }
  return token;
}

export function generateRefreshToken(payload: any) {
  const secretKeyRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRET || "";
  return jwt.sign(payload, secretKeyRefreshToken);
}

export function verify(token: string) {
  const secretKey = process.env.JWT_SECRET || "";
  return jwt.verify(token, secretKey);
}

export function getUserNameByToken(token: string): string {
  let decoded: any = jwt.decode(token);
  return decoded.username;
}
