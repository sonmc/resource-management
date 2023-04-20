import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { New } from 'src/infrastructure/schemas/new.schema';
import { User } from 'src/infrastructure/schemas/user.schema';
import { NotificationEntity } from 'src/domain/entities/notification.entity';
import { INotificationRepository } from 'src/domain/repositories/notification.repository.interface';

@Injectable()
export class NotificationRepository implements INotificationRepository {
    constructor(
        @InjectRepository(New)
        private readonly repository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(notificationE: NotificationEntity): Promise<NotificationEntity> {
        const notificationSchema = plainToClass(Notification, notificationE);
        const response = await this.repository.create(notificationSchema);
        await this.repository.save(response);
        return plainToClass(NotificationEntity, response);
    }

    async findAll(): Promise<NotificationEntity[]> {
        let notifs = await this.repository.find();
        return notifs.map((n) => plainToClass(NotificationEntity, n));
    }
}
