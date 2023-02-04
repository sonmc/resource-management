import { JwtAuthGuard } from './../../../infrastructure/common/guards/jwtAuth.guard';
import { Controller, UseGuards, Get, Post, Body, Query, Inject, UseInterceptors, CacheInterceptor, CacheTTL, CACHE_MANAGER } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetAllUseCases } from 'src/use-cases/employee/get-all.usecases';
import { CreateEmployeePresenter } from './presenter/create-employee.presenter';
import { CreateEmployeeUseCases } from 'src/use-cases/employee/create-employee.usercase';
import { GetOneUseCases } from 'src/use-cases/employee/get-one.usecases';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/domain/entities/user.entity';
import { Role } from 'src/domain/enums/role.enum';
import { Roles } from 'src/infrastructure/decorators/role.decorator';
import { RolesGuard } from 'src/infrastructure/common/guards/role.guard';
import { Cache } from 'cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('employees')
@ApiTags('employees')
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.GET_EMPLOYEES_USECASES_PROXY)
    private readonly getAllUseCaseProxy: UseCaseProxy<GetAllUseCases>,
    @Inject(UseCasesProxyModule.GET_EMPLOYEE_USECASES_PROXY)
    private readonly getOneUseCaseProxy: UseCaseProxy<GetOneUseCases>,
    @Inject(UseCasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY)
    private readonly createEmployeeUseCaseProxy: UseCaseProxy<CreateEmployeeUseCases>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @CacheTTL(10)
  @Roles(Role.ADMIN, Role.DEV)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async get(@Query() query) {
    if (query.id) {
      return await this.getOneUseCaseProxy.getInstance().execute(query?.id);
    }
    const employees_cached = await this.cacheManager.get('employees');
    if (!employees_cached) {
      const employees = await this.getAllUseCaseProxy.getInstance().execute();
      await this.cacheManager.set('employees', employees);
      return employees;
    }
    return employees_cached;
  }

  @Post()
  async create(@Body() createEmployeePresenter: CreateEmployeePresenter) {
    const userEntity = plainToClass(UserEntity, createEmployeePresenter);
    return await this.createEmployeeUseCaseProxy.getInstance().execute(userEntity);
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.userService.update(+id, updateUserDto);
  // }
}
