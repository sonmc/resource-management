import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { RolePermissionPresenter } from './presenter/role-perm.presenter';
import { AddRolePermUseCases } from 'src/use-cases/permission/add-role-perm.usecases';

@Controller('role-perms')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolePermController {
    constructor(
        @Inject(UseCasesProxyModule.ADD_PERM_TO_ROLE_USECASES_PROXY)
        private readonly addPermToRoleUseCaseProxy: UseCaseProxy<AddRolePermUseCases>
    ) {}

    @Post()
    async create(@Body() rolePermP: RolePermissionPresenter) {
        return await this.addPermToRoleUseCaseProxy.getInstance().execute(rolePermP);
    }
}
