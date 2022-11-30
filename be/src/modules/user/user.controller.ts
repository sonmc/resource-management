import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";

import { UserRegisterRequestDto } from "./dto/user-register.req.dto";
import { User } from "./entities/user.entity";

import { UserService } from "./user.service";

@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/register")
  @ApiCreatedResponse({
    description: "Created user object as response",
    type: User,
  })
  @ApiBadRequestResponse({ description: "User cannot register. Try again!" })
  async doUserRegistration(
    userRegister: UserRegisterRequestDto
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
