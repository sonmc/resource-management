import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'roles_pems' })
export class RolePem {
  @Column()
  @PrimaryColumn()
  role_id: Number;

  @Column()
  @PrimaryColumn()
  permission_id: Number;
}
