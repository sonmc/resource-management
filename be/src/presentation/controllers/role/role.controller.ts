import { Controller, Get, Post, Inject, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';

import { CreateRoleUseCases } from 'src/use-cases/role/create-role.usecases';
import { DeleteRoleUseCases } from 'src/use-cases/role/delete-role.usecases';
import { GetRolesUseCases } from 'src/use-cases/role/get-roles.usecases';
import { CreateRolePresenter } from './presenter/create-role.presenter';
import { RoleEntity } from 'src/domain/entities/role.entity';

@Controller('roles')
@ApiTags('roles')
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class RoleController {
  constructor(
    @Inject(UseCasesProxyModule.GET_ROLES_USECASES_PROXY)
    private readonly getRolesUsecaseProxy: UseCaseProxy<GetRolesUseCases>,
    @Inject(UseCasesProxyModule.CREATE_ROLE_USECASES_PROXY)
    private readonly createRoleUsecaseProxy: UseCaseProxy<CreateRoleUseCases>,
    @Inject(UseCasesProxyModule.DELETE_ROLE_USECASES_PROXY)
    private readonly deleteRoleUsecaseProxy: UseCaseProxy<DeleteRoleUseCases>
  ) {}

  @Get()
  async get() {
    const roles = await this.getRolesUsecaseProxy.getInstance().execute();
    return roles;
  }

  @Post()
  async create(@Body() createRolePresenter: CreateRolePresenter) {
    const roleEntity = plainToClass(RoleEntity, createRolePresenter);
    return await this.createRoleUsecaseProxy.getInstance().execute(roleEntity);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deleteRoleUsecaseProxy.getInstance().execute(+id);
  }
}
