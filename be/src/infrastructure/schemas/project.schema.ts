import {  Column,  Entity, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.schema';
import { BaseEntity } from './base.schema';
@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  start_date: Date;
 
  @ManyToMany(() => User, (users) => users.projects)
  @JoinTable({
    name: 'users_projects',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  setUsers(users: User[]) {
    this.users = users;
  }
}
