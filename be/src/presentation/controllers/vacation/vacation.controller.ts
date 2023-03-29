import { VacationEntity } from 'src/domain/entities/vacation.entity';
import { CreateVacationUseCases } from './../../../use-cases/vacation/create-vacation.usecase';
import { GetVacationUseCases } from 'src/use-cases/vacation/get-vacations.usecase';
import { CreateVacationPresenter } from './presenter/create-vacation.presenter';
import { Controller, Get, Post, Inject, Body, UseGuards, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';

@Controller('vacations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class VacationController {
    constructor(
        @Inject(UseCasesProxyModule.GET_VACATIONS_USECASES_PROXY)
        private readonly getVacationUseCases: UseCaseProxy<GetVacationUseCases>,
        @Inject(UseCasesProxyModule.CREATE_VACATIONS_USECASES_PROXY)
        private readonly createVacationUseCases: UseCaseProxy<CreateVacationUseCases>
    ) {}

    @Get()
    @Permissions(EndPoint.VACATION_GET)
    async get(@Query() query) {
        const roles = await this.getVacationUseCases.getInstance().execute(query);
        return roles;
    }

    @Post()
    async create(@Body() createVacationPresenter: CreateVacationPresenter) {
        const vacationEntity = plainToClass(VacationEntity, createVacationPresenter);
        const response = await this.createVacationUseCases.getInstance().execute(vacationEntity);
        return response;
    }
}
