import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.schema';
import { KanbanColumn } from './kanban_column.schema';
import { Project } from './project.schema';
import { User } from './user.schema';

@Entity({ name: 'kanbans' })
export class Kanban extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => KanbanColumn, (k) => k.kanban, {
    eager: true,
  })
  kanban_columns: KanbanColumn[];

  @ManyToMany(() => User, (users) => users.kanbans)
  @JoinTable({
    name: 'users_kanbans',
    joinColumn: { name: 'kanban_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  @ManyToOne(() => Project, (p) => p.kanbans)
  project: Project;
}
