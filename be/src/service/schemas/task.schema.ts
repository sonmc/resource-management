import { Column, Entity, JoinTable, ManyToMany, ManyToOne, Index, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { DepartmentSchema } from './department.schema';

@Entity({ name: 'tasks' })
export class TaskSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    title: string = '';

    @Column({ nullable: true })
    description: string = '';

    @Column()
    status: number = 0;

    @Column()
    index: number = 0;

    @Column({ nullable: true })
    implement: number = 0;

    @Column({ nullable: true })
    creator_id: number = 0;

    @Column()
    start_date: Date = new Date();

    @Column()
    end_date: Date = new Date();

    @Column()
    point: number = 0;

    @ManyToOne(() => DepartmentSchema, (dept) => dept.tasks)
    @JoinColumn({ name: 'departmentId' })
    department: DepartmentSchema | undefined;
}
