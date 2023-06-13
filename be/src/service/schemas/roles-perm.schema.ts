import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles_pems' })
export class RolePermSchema {
    @Column()
    @PrimaryColumn()
    role_id: Number = 0;

    @Column()
    @PrimaryColumn()
    perm_id: Number = 0;
}
