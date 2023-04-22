import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { CreateNotificationUseCases } from 'src/use-cases/notification/create-notification.usecase';
import { GetNotificationUseCases } from 'src/use-cases/notification/get-notification.usecase';
import { plainToClass } from 'class-transformer';
import { NotificationPresenter } from './presenter/notification.presenter';
import { NotificationEntity } from 'src/domain/entities/notification.entity';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(
        @Inject(UseCasesProxyModule.GET_NOTIFICATION_USECASES_PROXY)
        private readonly getNotificationsUseCaseProxy: UseCaseProxy<GetNotificationUseCases>,
        @Inject(UseCasesProxyModule.CREATE_NOTIFICATION_USECASES_PROXY)
        private readonly createNotificationUseCaseProxy: UseCaseProxy<CreateNotificationUseCases>
    ) {}

    @Get()
    async get(@Query() query) {
        const notifications = await this.getNotificationsUseCaseProxy.getInstance().execute(query);
        return notifications;
    }

    @Post()
    async create(@Body() notificationPresenter: NotificationPresenter) {
        const notificationE = plainToClass(NotificationEntity, notificationPresenter);
        return await this.createNotificationUseCaseProxy.getInstance().execute(notificationE);
    }
}
