import { BeforeInsert, Column, Entity, ManyToMany, JoinTable, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseSchema } from './base.schema';
import { RoleSchema } from './role.schema';
import { hash } from '../../util//bcrypt.util';
import { DepartmentSchema } from './department.schema';
import { WorkspaceSchema } from './workspace.schema';

@Entity({ name: 'users' })
export class UserSchema extends BaseSchema {
    @Column()
    @Index({ unique: true })
    username: string = '';

    @Column()
    is_owner: boolean = false;

    @Column()
    group_ids: string = '';

    @Column({ nullable: true })
    full_name: string = '';

    @Column()
    password: string = '';

    @Column({ nullable: true })
    last_login?: Date;

    @Column({ nullable: true })
    hash_refresh_token: string = '';

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await hash(password || this.password);
    }

    @ManyToOne(() => WorkspaceSchema, (p) => p.users)
    workspace: WorkspaceSchema | undefined;

    @ManyToMany(() => RoleSchema, (role: RoleSchema) => role.users)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles?: RoleSchema[];

    @ManyToMany(() => DepartmentSchema, (d) => d.users)
    @JoinTable({
        name: 'departments_users',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'department_id' },
    })
    departments: DepartmentSchema[] | undefined;
}
