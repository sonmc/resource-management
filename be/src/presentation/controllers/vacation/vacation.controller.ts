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
import { EventsGateway } from 'src/events/events.gateway';

@Controller('vacations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class VacationController {
    constructor(
        @Inject(UseCasesProxyModule.GET_VACATIONS_USECASES_PROXY)
        private readonly getVacationUseCases: UseCaseProxy<GetVacationUseCases>,
        @Inject(UseCasesProxyModule.CREATE_VACATIONS_USECASES_PROXY)
        private readonly createVacationUseCases: UseCaseProxy<CreateVacationUseCases>,
        @Inject(EventsGateway)
        private readonly eventsGateway: EventsGateway
    ) {}

    @Get()
    @Permissions(EndPoint.VACATION_GET)
    async get(@Query() query) {
        const vacations = await this.getVacationUseCases.getInstance().execute(query);
        return vacations;
    }

    @Post()
    async create(@Body() createVacationPresenter: CreateVacationPresenter) {
        const vacationEntity = plainToClass(VacationEntity, createVacationPresenter);
        const response = await this.createVacationUseCases.getInstance().execute(vacationEntity);
        this.eventsGateway.sendToClient(response.user.chapterHead, 'alo');
        return response;
    }
}
