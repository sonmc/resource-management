import { Column, CreateDateColumn, Entity, ManyToMany, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.schema';
import { Role } from './role.schema';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
