import { Column, Entity, ManyToMany, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserSchema } from './user.schema';
import { BaseSchema } from './base.schema';
import { TaskSchema } from './task.schema';
import { WorkspaceSchema } from './workspace.schema';
@Entity({ name: 'departments' })
export class DepartmentSchema extends BaseSchema {
    @Column()
    name: string = '';

    @Column({ nullable: true })
    description: string = '';

    @Column()
    admin_id: number = 0;

    @Column()
    start_date: Date = new Date();

    @ManyToOne(() => WorkspaceSchema, (p) => p.users)
    workspace: WorkspaceSchema | undefined;

    @OneToMany(() => TaskSchema, (k) => k.department, {
        eager: true,
    })
    tasks: TaskSchema[] | undefined;

    @ManyToMany(() => UserSchema, (user) => user.departments)
    @JoinTable({
        name: 'departments_users',
        joinColumn: { name: 'department_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: UserSchema[] | undefined;
}
