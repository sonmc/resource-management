import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from './permission.schema';
import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => User, (users) => users.roles)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
    })
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles, {
        eager: true,
    })
    @JoinTable({
        name: 'roles_pems',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id' },
    })
    permissions: Permission[];
}
