import { UserEntity } from './user.entity';

export class NewEntity {
    id: number;
    content: string;
    title: string;
    image: string;
    user: UserEntity;
    create_at: Date;
    update_at: Date;
}
