import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'news' })
export class New extends BaseEntity {
    @Column()
    content: string;
    @Column()
    title: string;
    @Column()
    image: string;
    @ManyToOne(() => User, (user) => user.workloads)
    user: User;
}
