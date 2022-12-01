import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { LocalStrategy } from "./guard/local.strategy";
import { JwtStrategy } from "./guard/jwt.strategy";
import { ConfigService } from "@nestjs/config";
import appConfig from "src/config/app.config";

const passport__service = PassportModule.registerAsync({
  useFactory: async () => ({
    defaultStrategy: "bearer",
  }),
  inject: [],
});

const jwt__service = JwtModule.registerAsync({
  useFactory: async () => ({
    secret: appConfig().appSecret,
    signOptions: {
      expiresIn: "1d",
    },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [passport__service, jwt__service, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [jwt__service, passport__service, AuthService],
})
export class AuthModule {}
