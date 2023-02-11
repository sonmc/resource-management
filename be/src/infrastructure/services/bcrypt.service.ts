import * as bcrypt from 'bcrypt';
export function hash(hashString: string): Promise<string> {
  return bcrypt.hash(hashString, 10);
}
export function compare(password: string, hashPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashPassword);
}
