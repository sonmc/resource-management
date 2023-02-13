import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Role } from './role.schema';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @Column()
  label: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'roles_pems',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];
}
