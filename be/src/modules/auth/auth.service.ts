import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userService.findByMail(email);
    console.log(user);
    if (!user) throw new BadRequestException();

    //let isMatched = await bcrypt.compare(password, user.password);
    let isMatched = password == user.password;
    if (!isMatched) throw new UnauthorizedException();

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
