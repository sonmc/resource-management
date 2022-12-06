import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";

@Entity({ name: "projects" })
export class Project extends BaseEntity {
  @ApiProperty({ description: "Primary key as User ID", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Project name", example: "Student Management" })
  @Column()
  name: string;

  @ApiProperty({ description: "When user was created" })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: "When user was updated" })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];
}
