import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleSchema } from './role.schema';
import { BaseSchema } from './base.schema';

@Entity({ name: 'permissions' })
export class PermSchema extends BaseSchema {
    @Column()
    name: string = '';

    @Column()
    label: string = '';

    @ManyToMany(() => RoleSchema, (role) => role.permissions)
    @JoinTable({
        name: 'roles_perms',
        joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: RoleSchema[] | undefined;
}
