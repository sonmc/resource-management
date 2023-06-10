import { Column, Entity } from 'typeorm';
import { BaseSchema } from './base.schema';

@Entity({ name: 'notifications' })
export class NotificationSchema extends BaseSchema {
    @Column({ nullable: true })
    title: string = "";

    @Column({ nullable: true })
    content: string = "";

    @Column()
    created_by: number = 0;

    @Column()
    to: number = 0;

    @Column()
    type: number = 0;

    @Column({ nullable: true })
    vacation_id: number = 0;
}
