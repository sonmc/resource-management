import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'news' })
export class New extends BaseEntity {
    @Column()
    content: string;

    @Column()
    title: string;

    @Column({
        nullable: true,
    })
    image: string;

    @Column()
    user_id: number;

    @ManyToOne(() => User, (user) => user.news)
    user: User;
}
