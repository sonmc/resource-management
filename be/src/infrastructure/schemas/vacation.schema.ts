import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'vacations' })
export class Vacation extends BaseEntity {
    @Column()
    reason: string;
    @Column()
    status: number;
    @Column()
    type: number;
    @Column()
    start: Date;
    @Column()
    end: Date;
    @ManyToOne(() => User, (user) => user.vacations)
    user: User;
}
