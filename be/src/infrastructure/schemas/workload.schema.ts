import {  Column, Entity, ManyToOne, JoinTable } from 'typeorm';
import { User } from './user.schema';
import { BaseEntity } from './base.schema';

@Entity({ name: 'workloads' })
export class Workload extends BaseEntity {
 
    @Column()
    value: string;

    @Column()
    user_id: number;

    @Column()
    project_id: number;

    @ManyToOne(() => User, (user) => user.workloads)
    @JoinTable({
        name: 'users',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    user: User;
}
