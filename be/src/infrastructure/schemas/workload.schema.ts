import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.schema';

@Entity({ name: 'workloads' })
export class Workload {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    value: string;

    @Column()
    user_id: number;

    @Column()
    project_id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @ManyToOne(() => User, (user) => user.workloads)
    user: User;
}
