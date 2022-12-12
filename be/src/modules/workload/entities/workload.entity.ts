import { User } from "src/modules/user/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "workloads" })
export class Workload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  start_date: Date;

  @Column()
  user_id: number;

  @Column()
  project_id: number;

  @ManyToOne(() => User, (user) => user.workloads)
  user: User;
}
