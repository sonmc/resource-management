import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PermSchema } from './perm.schema';
import { UserSchema } from './user.schema';
import { BaseSchema } from './base.schema';

@Entity({ name: 'roles' })
export class RoleSchema extends BaseSchema {
    @Column()
    name: string = '';

    @Column({ nullable: true })
    description: string = '';

    @ManyToMany(() => UserSchema, (users) => users.roles)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: UserSchema[] | undefined;

    @ManyToMany(() => PermSchema, (perm) => perm.roles, {
        eager: true,
    })
    @JoinTable({
        name: 'roles_perms',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'perm_id' },
    })
    permissions: PermSchema[] | undefined;
}
