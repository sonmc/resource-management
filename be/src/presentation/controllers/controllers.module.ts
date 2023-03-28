import { Module } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { UseCasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { ProjectController } from './project/project.controller';
import { RoleController } from './role/role.controller';
import { UserController } from './employee/employee.controller';
import { PermissionController } from './permission/permission.controller';
import { RolesGuard } from 'src/infrastructure/common/guards/role.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/common/strategies/local.strategy';
import { JwtRefreshTokenStrategy } from 'src/infrastructure/common/strategies/jwt-refresh.strategy';
import { VacationController } from './vacation/vacation.controller';

@Module({
    imports: [UseCasesProxyModule.register()],
    controllers: [AuthController, ProjectController, RoleController, UserController, PermissionController, VacationController],
    providers: [LocalStrategy, JwtStrategy, RolesGuard, PermissionsGuard, JwtRefreshTokenStrategy, LoggerService, ExceptionsService],
})
export class ControllersModule {}