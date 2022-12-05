import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
  forwardRef,
  Inject,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

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

  @UseGuards(JwtStrategy)
  @Post()
  create(@Request() request) {
    return this.userService.create(request.body);
  }
}
