import { Controller, Get, Post, Request, UseGuards, Patch, Param, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@UseGuards(JwtStrategy)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Request() request) {
    return this.userService.create(request.body);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

}
