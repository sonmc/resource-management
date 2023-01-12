import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { ProjectController } from './project/project.controller';
import { RoleController } from './role/role.controller';

@Module({
    imports: [UsecasesProxyModule.register()],
    controllers: [AuthController, ProjectController, RoleController],
})
export class ControllersModule {}
