import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Workload } from "src/modules/workload/entities/workload.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { Role } from "src/modules/role/entities/role.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  status: number;

  @Column()
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @OneToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Workload, (workload) => workload.user)
  workloads: Workload[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];
}
