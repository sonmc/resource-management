import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseSchema } from './base.schema';
import { UserSchema } from './user.schema';

@Entity({ name: 'vacations' })
export class VacationSchema extends BaseSchema {
    @Column()
    reason: string = '';
    @Column()
    status: number = 0;
    @Column()
    type: number = 0;
    @Column()
    start?: Date;
    @Column()
    end?: Date;
    @ManyToOne(() => UserSchema, (user) => user.vacations)
    user?: UserSchema;
}
