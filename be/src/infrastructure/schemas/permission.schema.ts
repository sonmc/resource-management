import { Column, CreateDateColumn, Entity, ManyToMany, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Role } from './role.schema';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Column()
  name: string;
 
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
