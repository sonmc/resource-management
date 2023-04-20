import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { CreateUseCases } from 'src/use-cases/notification/create.usecase';
import { GetUseCases } from 'src/use-cases/notification/get.usecase';
import { plainToClass } from 'class-transformer';
import { NotificationPresenter } from './presenter/notification.presenter';
import { NotificationEntity } from 'src/domain/entities/notification.entity';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(
        @Inject(UseCasesProxyModule.GET_NOTIFICATION_USECASES_PROXY)
        private readonly getNotificationsUseCaseProxy: UseCaseProxy<GetUseCases>,
        @Inject(UseCasesProxyModule.CREATE_NOTIFICATION_USECASES_PROXY)
        private readonly createNotificationUseCaseProxy: UseCaseProxy<CreateUseCases>
    ) {}

    @Get()
    async get() {
        const notifications = await this.getNotificationsUseCaseProxy.getInstance().execute();
        return notifications;
    }

    @Post()
    async create(@Body() notificationPresenter: NotificationPresenter) {
        const notificationE = plainToClass(NotificationEntity, notificationPresenter);
        return await this.createNotificationUseCaseProxy.getInstance().execute(notificationE);
    }
}
