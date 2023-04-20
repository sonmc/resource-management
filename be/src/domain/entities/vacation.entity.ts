import { UserEntity } from './user.entity';

export class VacationEntity {
    id: number;
    user: UserEntity;
    start_date: Date;
    end_date: Date;
    type: number;
    user_id: number;
}
