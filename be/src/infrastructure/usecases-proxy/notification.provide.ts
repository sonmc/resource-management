import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { CreateUseCases } from 'src/use-cases/notification/create.usecase';
import { NotificationRepository } from 'src/presentation/repositories/notification.repository';
import { GetUseCases } from 'src/use-cases/notification/get.usecase';

export function createNotificationProvide(provide) {
    return {
        inject: [LoggerService, NotificationRepository],
        provide,
        useFactory: (logger: LoggerService, notificationRepository: NotificationRepository) => new UseCaseProxy(new CreateUseCases(logger, notificationRepository)),
    };
}
export function getNotificationsProvide(provide) {
    return {
        inject: [NotificationRepository],
        provide,
        useFactory: (notificationRepository: NotificationRepository) => new UseCaseProxy(new GetUseCases(notificationRepository)),
    };
}
