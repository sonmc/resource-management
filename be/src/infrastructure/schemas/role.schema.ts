import { Column, Entity, JoinTable, ManyToMany,   OneToMany } from 'typeorm';
import { Permission } from './permission.schema';
import { BaseEntity } from './base.schema';
import { User } from './user.schema';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
