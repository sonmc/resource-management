import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleSchema } from './role.schema';

@Entity({ name: 'permissions' })
export class PermSchema {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    profile_types: string = '[]';

    @Column()
    title: string = '';

    @Column()
    module: string = '';

    @Column()
    action: string = '';

    @ManyToMany(() => RoleSchema, (role) => role.permissions)
    @JoinTable({
        name: 'roles_perms',
        joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id' },
    })
    roles: RoleSchema[] | undefined;
}
