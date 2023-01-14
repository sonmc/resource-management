import { Controller, UseGuards, Get, Post, Body, Query, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetEmployeesUseCases } from 'src/usecases/employee/get-employees.usecases';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';
import { CreateEmployeePresenter } from './presenter/create-employee.presenter';
import { CreateEmployeeUseCases } from 'src/usecases/employee/create-employee.usercase';
import { toEmployeeEntity } from 'src/actions/employee.action';
import { GetEmployeeUseCases } from 'src/usecases/employee/get-employee.usecases';

@Controller('employees')
@ApiTags('employees')
@UseGuards(JwtStrategy)
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController {
    constructor(
        @Inject(UsecasesProxyModule.GET_EMPLOYEES_USECASES_PROXY)
        private readonly getUsersUsecaseProxy: UseCaseProxy<GetEmployeesUseCases>,
        @Inject(UsecasesProxyModule.GET_EMPLOYEE_USECASES_PROXY)
        private readonly getUserUsecaseProxy: UseCaseProxy<GetEmployeeUseCases>,
        @Inject(UsecasesProxyModule.CREATE_EMPLOYEES_USECASES_PROXY)
        private readonly createEmployeeUsecaseProxy: UseCaseProxy<CreateEmployeeUseCases>
    ) {}

    @Get()
    async get(@Query() query) {
        let response = null;
        if (query.id) {
            response = await this.getUserUsecaseProxy.getInstance().execute(query?.id);
        }
        response = await this.getUsersUsecaseProxy.getInstance().execute();
        return response;
    }

    @Post()
    async create(@Body() createEmployeePresenter: CreateEmployeePresenter) {
        const userEntity = toEmployeeEntity(createEmployeePresenter);
        return await this.createEmployeeUsecaseProxy.getInstance().execute(userEntity);
    }

    // @Put(':id')
    // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.userService.update(+id, updateUserDto);
    // }
}
