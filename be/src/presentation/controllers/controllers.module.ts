import { Module } from '@nestjs/common';
import { JwtRefreshTokenStrategy } from 'src/infrastructure/common/strategies/jwt-refresh.strategy';
import { LocalStrategy } from 'src/infrastructure/common/strategies/local.strategy';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { UseCasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { ProjectController } from './project/project.controller';
import { RoleController } from './role/role.controller';
import { UserController } from './employee/employee.controller';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/role.guard';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [AuthController, ProjectController, RoleController, UserController],
  providers: [LocalStrategy, RolesGuard, JwtAuthGuard, JwtRefreshTokenStrategy, LoggerService, ExceptionsService],
})
export class ControllersModule {}
