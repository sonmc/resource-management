import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LoggerModule } from "./infrastructure/logger/logger.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { UsecasesProxyModule } from "./infrastructure/usecases-proxy/usecases-proxy.module";
import { ControllersModule } from "./application/controllers/controllers.module";
import { BcryptModule } from "./infrastructure/services/bcrypt/bcrypt.module";
import { JwtModule as JwtServiceModule } from "./infrastructure/services/jwt/jwt.module";
import { LocalStrategy } from "./infrastructure/common/strategies/local.strategy";
import { JwtStrategy } from "./infrastructure/common/strategies/jwt.strategy";
import { JwtRefreshTokenStrategy } from "./infrastructure/common/strategies/jwt-refresh.strategy";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "./infrastructure/config/typeorm.config";
import { ApiTokenMiddleware } from "./application/middleware/api-token.middleware";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PassportModule,
    JwtModule.register({
      secret: "JWT_SECRET_KEY",
      signOptions: { expiresIn: "60m" },
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenMiddleware)
      .forRoutes({ path: "/", method: RequestMethod.ALL });
  }
}
