import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseSchema } from './base.schema';
import { UserSchema } from './user.schema';

@Entity({ name: 'news' })
export class NewSchema extends BaseSchema {
    @Column()
    title: string = '';

    @Column()
    content: string = '';

    @Column({
        nullable: true,
    })
    image?: string;

    @ManyToOne(() => UserSchema, (user: UserSchema) => user.news)
    user?: UserSchema;
}
