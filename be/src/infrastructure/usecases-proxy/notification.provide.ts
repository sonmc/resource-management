import { LoggerService } from '../logger/logger.service';
import { UseCaseProxy } from './usecases-proxy';
import { CreateNotificationUseCases } from 'src/use-cases/notification/create-notification.usecase';
import { NotificationRepository } from 'src/presentation/repositories/notification.repository';
import { GetNotificationUseCases } from 'src/use-cases/notification/get-notification.usecase';

export function createNotificationProvide(provide) {
    return {
        inject: [LoggerService, NotificationRepository],
        provide,
        useFactory: (logger: LoggerService, notificationRepository: NotificationRepository) => new UseCaseProxy(new CreateNotificationUseCases(logger, notificationRepository)),
    };
}
export function getNotificationsProvide(provide) {
    return {
        inject: [NotificationRepository],
        provide,
        useFactory: (notificationRepository: NotificationRepository) => new UseCaseProxy(new GetNotificationUseCases(notificationRepository)),
    };
}
