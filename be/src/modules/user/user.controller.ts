import { Controller, Get, UseGuards, Inject, forwardRef } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtStrategy)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
