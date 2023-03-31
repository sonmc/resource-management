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
import { RolePermController } from './role-perm/role-perm.controller';
import { UserRepository } from '../repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/schemas/user.schema';
import { UserRole } from 'src/infrastructure/schemas/user-role.schema';
import { Project } from 'src/infrastructure/schemas/project.schema';
import { ProjectRepository } from '../repositories/project.repository';
@Module({
    imports: [UseCasesProxyModule.register(), TypeOrmModule.forFeature([User, UserRole, Project])],
    controllers: [AuthController, ProjectController, RoleController, UserController, PermissionController, VacationController, RolePermController],
    providers: [LocalStrategy, JwtStrategy, RolesGuard, PermissionsGuard, JwtRefreshTokenStrategy, LoggerService, ExceptionsService, UserRepository, ProjectRepository],
})
export class ControllersModule {}
