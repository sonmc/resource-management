import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from './perm.schema';
import { User } from './user.schema';
import { BaseSchema } from './base.schema';

@Entity({ name: 'roles' })
export class RoleSchema extends BaseSchema {
    @Column()
    name: string = '';

    @Column({ nullable: true })
    description: string = '';

    @ManyToMany(() => User, (users) => users.roles)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: User[] | undefined;

    @ManyToMany(() => Permission, (perm) => perm.roles, {
        eager: true,
    })
    @JoinTable({
        name: 'roles_perms',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'perm_id' },
    })
    permissions: Permission[] | undefined;
}
