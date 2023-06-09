import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles_perms' })
export class RolePem {
    @Column()
    @PrimaryColumn()
    role_id: Number = 0;

    @Column()
    @PrimaryColumn()
    perm_id: Number = 0;
}
