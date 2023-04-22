import { VacationEntity } from 'src/domain/entities/vacation.entity';
import { CreateVacationUseCases } from './../../../use-cases/vacation/create-vacation.usecase';
import { GetVacationUseCases } from 'src/use-cases/vacation/get-vacations.usecase';
import { CreateVacationPresenter } from './presenter/create-vacation.presenter';
import { Controller, Get, Post, Inject, Body, UseGuards, Query, Request } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { PermissionsGuard } from 'src/infrastructure/common/guards/permission.guard';
import { Permissions } from 'src/infrastructure/decorators/permission.decorator';
import { EndPoint } from 'src/domain/enums/endpoint.enum';
import { EventsGateway } from 'src/events/events.gateway';
import { CreateNotificationUseCases } from 'src/use-cases/notification/create-notification.usecase';
import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { VACATION, VACATION_STATUS } from 'src/business-rules/notification.rule';
import { GetOneUseCases } from 'src/use-cases/employee/get-one.usecases';
import { REMOTE } from 'src/business-rules/employee.rule';
import { NotificationPresenter } from '../notification/presenter/notification.presenter';
import { timeAgo } from 'src/actions/common';
import { ChangeStatusPresenter } from './presenter/change-status.presenter';
import { ChangeStatusUseCases } from 'src/use-cases/vacation/change-status.usecase';

@Controller('vacations')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class VacationController {
    constructor(
        @Inject(UseCasesProxyModule.GET_VACATIONS_USECASES_PROXY)
        private readonly getVacationUseCases: UseCaseProxy<GetVacationUseCases>,
        @Inject(UseCasesProxyModule.CREATE_VACATIONS_USECASES_PROXY)
        private readonly createVacationUseCases: UseCaseProxy<CreateVacationUseCases>,
        @Inject(UseCasesProxyModule.CREATE_NOTIFICATION_USECASES_PROXY)
        private readonly createNotificationUseCases: UseCaseProxy<CreateNotificationUseCases>,
        @Inject(UseCasesProxyModule.GET_EMPLOYEE_USECASES_PROXY)
        private readonly getOneUseCaseProxy: UseCaseProxy<GetOneUseCases>,
        @Inject(UseCasesProxyModule.CHANGE_STATUS_USECASES_PROXY)
        private readonly changeStatusUseCaseProxy: UseCaseProxy<ChangeStatusUseCases>,
        @Inject(EventsGateway)
        private readonly eventsGateway: EventsGateway
    ) {}

    @Get()
    @Permissions(EndPoint.VACATION_GET)
    async get(@Query() query, @Request() request) {
        let model = { user_id: request.user.id, searchTerm: query.searchTerm, status: query.status, role_ids: request.user.roles.map((x) => x.id) };
        const vacations = await this.getVacationUseCases.getInstance().execute(model);
        return vacations;
    }

    @Post('change_status')
    async changeStatus(@Body() changeStatusPresenter: ChangeStatusPresenter) {
        const result = await this.changeStatusUseCaseProxy.getInstance().execute(changeStatusPresenter.vacation_id, changeStatusPresenter.status);
        return result;
    }

    @Post()
    async create(@Body() createVacationPresenter: CreateVacationPresenter) {
        const vacationEntity = plainToClass(VacationEntity, createVacationPresenter);
        vacationEntity.status = VACATION_STATUS.PENDING;
        const vacation = await this.createVacationUseCases.getInstance().execute(vacationEntity);
        const user = await this.getOneUseCaseProxy.getInstance().execute(vacation.user.id);
        const full_name = (user.first_name ? user.first_name : '') + ' ' + (user.last_name ? user.last_name : '');
        const title = vacation.type == REMOTE ? full_name + ' ' + 'request remote' : full_name + 'request offline';
        const content = vacation.reason;
        const created_by = user.id;
        const to = user.chapterHead;
        const type = VACATION;
        const vacation_id = vacation.id;
        const notificationEntity = new NotificationEntity(title, content, created_by, to, type, vacation_id);
        const notification = await this.createNotificationUseCases.getInstance().execute(notificationEntity);
        let notificationPresenter = plainToClass(NotificationPresenter, notification);
        notificationPresenter.time_ago = timeAgo(notification.created_at);
        this.eventsGateway.sendToClient(vacation.user.chapterHead, 'vacations');
        return vacation;
    }
}
