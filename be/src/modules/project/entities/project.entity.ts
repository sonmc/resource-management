import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from "typeorm";

import { User } from "src/modules/user/entities/user.entity";

@Entity({ name: "projects" })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (users) => users.projects)
  @JoinTable({
    name: "users_projects",
    joinColumn: { name: "project_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id" },
  })
  users: User[];

  setUsers(users: User[]) {
    this.users = users;
  }
}
