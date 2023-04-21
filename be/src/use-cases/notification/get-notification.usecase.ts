import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { INotificationRepository } from 'src/domain/repositories/notification.repository.interface';

export class GetNotificationUseCases {
    constructor(private readonly notificationRepository: INotificationRepository) {}

    async execute(query): Promise<NotificationEntity[]> {
        let user_id = query.user_id;
        const notifs = await this.notificationRepository.findByUserId(user_id);
        return notifs;
    }
}
