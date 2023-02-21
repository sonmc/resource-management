import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';
import { GetPermissionsUseCases } from 'src/use-cases/permission/get-all.usecases';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionController {
  constructor(
    @Inject(UseCasesProxyModule.GET_PERMISSIONS_USECASES_PROXY)
    private readonly getPermissionsUseCaseProxy: UseCaseProxy<GetPermissionsUseCases>
  ) {}

  @Get()
  @Permissions(EndPoint.PERMISSION_GET)
  async get() {
    const permissionInstance = this.getPermissionsUseCaseProxy.getInstance();
    const permissions = await permissionInstance.execute();
    return permissions;
  }
}
