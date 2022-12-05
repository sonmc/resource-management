import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthPayload } from "./interfaces/auth-payload.interface";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  //function hash password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  //function compare password param with user password in database
  async comparePassword(
    password: string,
    storePasswordHash: string
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const check = await this.comparePassword(password, user.password);

    if (!user || !check) {
      return false;
    }
    return user;
  }

  async login(user: User) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
