import { Controller, UseGuards, Get, Post, Body, Query, Inject, Delete, Param } from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetAllUseCases } from 'src/use-cases/employee/get-all.usecases';
import { CreateEmployeePresenter } from './presenter/create-employee.presenter';
import { CreateEmployeeUseCases } from 'src/use-cases/employee/create-employee.usecase';
import { GetOneUseCases } from 'src/use-cases/employee/get-one.usecases';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/domain/entities/user.entity';
import { EndPoint } from 'src/domain/enums/endpoint.enum';

import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { DeleteEmployeeUseCases } from 'src/use-cases/employee/delete-employee.usecase';

@Controller('employees')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
    constructor(
        @Inject(UseCasesProxyModule.GET_EMPLOYEES_USECASES_PROXY)
        private readonly getAllUseCaseProxy: UseCaseProxy<GetAllUseCases>,
        @Inject(UseCasesProxyModule.GET_EMPLOYEE_USECASES_PROXY)
        private readonly getOneUseCaseProxy: UseCaseProxy<GetOneUseCases>,
        @Inject(UseCasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY)
        private readonly createEmployeeUseCaseProxy: UseCaseProxy<CreateEmployeeUseCases>,
        @Inject(UseCasesProxyModule.DELETE_EMPLOYEE_USECASES_PROXY)
        private readonly deleteEmployeeUsecaseProxy: UseCaseProxy<DeleteEmployeeUseCases>
    ) {}

    @Get()
    @Permissions(EndPoint.EMPLOYEE_GET)
    async get(@Query() query) {
        if (query.id) {
            return await this.getOneUseCaseProxy.getInstance().execute(query?.id);
        }
        const employees = await this.getAllUseCaseProxy.getInstance().execute(query);
        return employees;
    }

    @Post()
    @Permissions(EndPoint.EMPLOYEE_CREATE)
    async create(@Body() employeePresenter: CreateEmployeePresenter) {
        const userEntity = plainToClass(UserEntity, employeePresenter);
        const userCreated = await this.createEmployeeUseCaseProxy.getInstance().execute(userEntity);
        return userCreated;
    }

    @Delete(':id')
    @Permissions(EndPoint.EMPLOYEE_DELETE)
    async delete(@Param('id') id: string) {
        const idDeleted = await this.deleteEmployeeUsecaseProxy.getInstance().execute(+id);
        return idDeleted;
    }
}
