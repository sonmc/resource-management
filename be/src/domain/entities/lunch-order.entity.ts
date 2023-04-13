import { UserEntity } from './user.entity';

export class LunchOrderEntity {
    user_id: number;
    lunch_calendars: string;
    user: UserEntity;
}
