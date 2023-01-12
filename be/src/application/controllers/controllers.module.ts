import { Module } from "@nestjs/common";
import { JwtRefreshTokenStrategy } from "src/infrastructure/common/strategies/jwt-refresh.strategy";
import { JwtStrategy } from "src/infrastructure/common/strategies/jwt.strategy";
import { LocalStrategy } from "src/infrastructure/common/strategies/local.strategy";
import { ExceptionsService } from "src/infrastructure/exceptions/exceptions.service";
import { LoggerService } from "src/infrastructure/logger/logger.service";
import { UsecasesProxyModule } from "../../infrastructure/usecases-proxy/usecases-proxy.module";
import { AuthController } from "./auth/auth.controller";
import { ProjectController } from "./project/project.controller";
import { RoleController } from "./role/role.controller";
import { UserController } from "./user/user.controller";

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    AuthController,
    ProjectController,
    RoleController,
    UserController,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    LoggerService,
    ExceptionsService,
  ],
})
export class ControllersModule {}
