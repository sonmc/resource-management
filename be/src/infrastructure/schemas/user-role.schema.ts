import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users_roles' })
export class UserRole {
  @Column()
  @PrimaryColumn()
  role_id: Number;

  @Column()
  @PrimaryColumn()
  user_id: Number;
}
