import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { UserService } from "./user.service";

@ApiTags("User")
@UseGuards(JwtStrategy)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Request() request) {
    return this.userService.create(request.body);
  }
}
