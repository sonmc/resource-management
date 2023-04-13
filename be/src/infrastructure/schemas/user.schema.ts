import { hash } from 'src/infrastructure/services/bcrypt.service';
import { BeforeInsert, Column, Entity, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Project } from './project.schema';
import { Role } from './role.schema';
import { Workload } from './workload.schema';
import { Vacation } from './vacation.schema';
import { Kanban } from './kanban.schema';
import { Task } from './task.schema';
import { New } from './new.schema';
import { LunchOrder } from './lunch_order.schema';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column()
    @Index({ unique: true })
    username: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    password: string;

    @Column()
    status: number;

    @Column()
    gender: boolean;

    @Column({ nullable: true })
    avatar: string;

    @Column()
    dob: Date;

    @Column({ nullable: true })
    last_login?: Date;

    @Column('varchar', { nullable: true })
    hash_refresh_token: string;

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }

    @OneToMany(() => Workload, (workload) => workload.user, {
        eager: true,
    })
    workloads: Workload[];

    @OneToMany(() => LunchOrder, (lo) => lo.user, {
        eager: true,
    })
    lunch_orders: LunchOrder[];

    @OneToMany(() => New, (n) => n.user, {
        eager: true,
    })
    news: New[];

    @OneToMany(() => Vacation, (vacation) => vacation.user, {
        eager: true,
    })
    vacations: Vacation[];

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: Role[];

    @ManyToMany(() => Project, (project) => project.users)
    @JoinTable({
        name: 'users_projects',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'project_id' },
    })
    projects: Project[];

    @ManyToMany(() => Task, (v) => v.users)
    @JoinTable({
        name: 'users_tasks',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'task_id' },
    })
    tasks: Task[];

    @ManyToMany(() => Kanban, (v) => v.users)
    @JoinTable({
        name: 'users_kanbans',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'kanban_id' },
    })
    kanbans: Kanban[];
}
