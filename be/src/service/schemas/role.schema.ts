import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermSchema } from './perm.schema';
import { UserSchema } from './user.schema';

@Entity({ name: 'roles' })
export class RoleSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    title: string = '';

    @Column()
    profile_type: number = 0;

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
