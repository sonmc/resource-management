import { Column, Entity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.schema';
import { BaseEntity } from './base.schema';
import { Kanban } from './kanban.schema';
import { Workload } from './workload.schema';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    note: string;

    @Column()
    start_date: Date;

    @Column()
    project_leader: number;

    @OneToMany(() => Kanban, (k) => k.project, {
        eager: true,
    })
    kanbans: Kanban[];

    @OneToMany(() => Workload, (workload) => workload.project, {
        eager: true,
    })
    workloads: Workload[];

    @ManyToMany(() => User, (user) => user.projects)
    @JoinTable({
        name: 'users_projects',
        joinColumn: { name: 'project_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: User[];

    setUsers(users: User[]) {
        this.users = users;
    }
}
