import { UserEntity } from 'src/domain/entities/user.entity';

export class NotificationPresenter {
    id: number;
    title: string;
    content: string;
    from_user: UserEntity;
    date_time: string;
    type: number;
    time_ago: string;
}
