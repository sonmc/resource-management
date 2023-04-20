import { NotificationEntity } from '../entities/notification.entity';

export interface INotificationRepository {
    create(project: NotificationEntity): Promise<NotificationEntity>;
    findAll(): Promise<NotificationEntity[]>;
}
