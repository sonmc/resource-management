import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { INotificationRepository } from 'src/domain/repositories/notification.repository.interface';

export class GetUseCases {
    constructor(private readonly notificationRepository: INotificationRepository) {}

    async execute(): Promise<NotificationEntity[]> {
        const notifs = await this.notificationRepository.findAll();
        return notifs;
    }
}
