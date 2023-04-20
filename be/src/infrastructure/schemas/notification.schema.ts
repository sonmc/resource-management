import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.schema';

@Entity({ name: 'notifications' })
export class Notifications extends BaseEntity {
    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    content: string;

    @Column()
    created_by: number;

    @Column()
    to: number;

    @Column()
    type: number;

    @Column({ nullable: true })
    vacation_id: number;
}
