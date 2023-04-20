import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';

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
    async get() {
        const permissionInstance = this.getNotificationsUseCaseProxy.getInstance();
        const permissions = await permissionInstance.execute();
        return permissions;
    }

    @Post()
    async create() {
        const permissionInstance = this.createNotificationUseCaseProxy.getInstance();
        const permissions = await permissionInstance.execute();
        return permissions;
    }
}
