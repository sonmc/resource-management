import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiTokenCheckMiddleware } from "./common/middleware/api-token-check.middleware";
import { typeOrmAsyncConfig } from "./config/typeorm.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserRepository } from "./modules/user/user.repository";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { UserService } from "./modules/user/user.service";
import { LocalStrategy } from "./modules/auth/strategies/local.strategy";
import { JsonWebTokenStrategy } from "./modules/auth/strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "JWT_SECRET_KEY",
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JsonWebTokenStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes({ path: "/", method: RequestMethod.ALL });
  }
}
