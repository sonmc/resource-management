import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.schema';
import { Kanban } from './kanban.schema';
import { Task } from './task.schema';

@Entity({ name: 'kanban_columns' })
export class KanbanColumn extends BaseEntity {
  @Column()
  name: string;
  @Column()
  index: number;
  @OneToMany(() => Task, (k) => k.kanban_column, {
    eager: true,
  })
  tasks: Task[];

  @ManyToOne(() => Kanban, (p) => p.kanban_columns)
  kanban: Kanban;
}
