import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetRolesUseCases } from 'src/usecases/role/get-roles.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';

@Controller('roles')
@ApiTags('roles')
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class RoleController {
    constructor(
        @Inject(UsecasesProxyModule.GET_ROLES_USECASES_PROXY)
        private readonly getRolesUsecaseProxy: UseCaseProxy<GetRolesUseCases>
    ) {}

    @Get()
    async get() {
        const roles = await this.getRolesUsecaseProxy.getInstance().execute();
        return roles;
    }
}
