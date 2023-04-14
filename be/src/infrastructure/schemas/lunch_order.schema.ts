import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'lunch_orders' })
export class LunchOrder extends BaseEntity {
    @Column({
        type: 'json',
        nullable: true,
    })
    lunch_calendars: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
