import { INotificationRepository } from 'src/domain/repositories/notification.repository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { NotificationEntity } from 'src/domain/entities/notification.entity';

export class CreateNotificationUseCases {
    constructor(private readonly logger: ILogger, private readonly notificationRepository: INotificationRepository) {}

    async execute(notifE: NotificationEntity): Promise<NotificationEntity> {
        const newE = await this.notificationRepository.create(notifE);
        this.logger.log('createNotificationUseCases execute', 'Notification have been inserted');
        return newE;
    }
}
