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
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { AuthenticationGuard } from "./guard/auth.guard";
import { LocalAuthGuard } from "./guard/local.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@ApiTags("Auth")
@Controller("auth")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() request): Promise<any> {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtStrategy)
  @Get("/login")
  async verifyToken(@Request() request): Promise<UserDto> {
    return this.authService.login(request);
  }

  @UseGuards(AuthenticationGuard)
  @Post("/logout")
  async getUserLogout(@Response() response): Promise<Response> {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    response.clearCookie("access_token");
    response.clearCookie("token");

    return response.sendStatus(200);
  }
}
