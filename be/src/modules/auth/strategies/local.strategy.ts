import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "src/modules/user/entities/user.entity";
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.authentication(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
