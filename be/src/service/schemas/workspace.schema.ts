import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserSchema } from './user.schema';
import { DepartmentSchema } from './department.schema';

@Entity({ name: 'workspaces' })
export class WorkspaceSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    title: string = '';

    @Column()
    is_super: boolean = false;

    @Column({ nullable: true })
    description: string = '';

    @OneToMany(() => UserSchema, (u) => u.workspace, {
        eager: true,
    })
    users: UserSchema[] | undefined;

    @OneToMany(() => DepartmentSchema, (u) => u.workspace, {
        eager: true,
    })
    departments: DepartmentSchema[] | undefined;
}
