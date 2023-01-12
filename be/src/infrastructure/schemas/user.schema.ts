import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Project } from "./project.schema";
import { Role } from "./role.schema";
import { Workload } from "./workload.schema";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column()
  gender: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  dob: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  last_login?: Date;

  @Column("varchar", { nullable: true })
  hash_refresh_token: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinColumn()
  role: Role;

  @OneToMany(() => Workload, (workload) => workload.user, {
    eager: true,
  })
  workloads: Workload[];

  @ManyToMany(() => Project, (projects) => projects.users)
  @JoinTable({
    name: "users_projects",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "project_id" },
  })
  projects: Project[];
}
